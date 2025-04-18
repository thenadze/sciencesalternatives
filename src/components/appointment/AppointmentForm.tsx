
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { EnergyButton } from "@/components/ui/energy-button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoFields } from "./form/PersonalInfoFields";
import { DateTimeFields } from "./form/DateTimeFields";
import { ServiceSelection } from "./form/ServiceSelection";
import { AdditionalInfo } from "./form/AdditionalInfo";
import { appointmentSchema, type AppointmentFormValues } from "./form/types";

export const AppointmentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format date
      const formattedDate = format(data.appointment_date, 'yyyy-MM-dd');
      
      // Final availability check with Supabase
      const { data: existingAppointments, error: checkError } = await supabase
        .from('appointments')
        .select('id')
        .eq('appointment_date', formattedDate)
        .eq('appointment_time', data.appointment_time)
        .neq('status', 'cancelled');
      
      if (checkError) throw checkError;
      
      if (existingAppointments && existingAppointments.length > 0) {
        toast({
          title: "Horaire non disponible",
          description: "Ce créneau vient d'être réservé. Veuillez sélectionner un autre horaire.",
          variant: "destructive",
        });
        form.setValue("appointment_time", "");
        setIsSubmitting(false);
        return;
      }

      // Check Google Calendar availability
      const { data: gcalCheck } = await supabase.functions.invoke('google-calendar', {
        body: { 
          action: 'check',
          date: formattedDate,
          time: data.appointment_time
        }
      });

      if (!gcalCheck.available) {
        toast({
          title: "Horaire non disponible",
          description: "Ce créneau n'est plus disponible dans le calendrier. Veuillez sélectionner un autre horaire.",
          variant: "destructive",
        });
        form.setValue("appointment_time", "");
        setIsSubmitting(false);
        return;
      }
      
      // Create appointment in Supabase
      const { error } = await supabase.from('appointments').insert({
        service: data.service,
        appointment_date: formattedDate,
        appointment_time: data.appointment_time,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        message: data.message || '',
        status: 'pending'
      });
      
      if (error) throw error;

      // Create event in Google Calendar
      const { data: gcalEvent, error: gcalError } = await supabase.functions.invoke('google-calendar', {
        body: {
          action: 'create',
          date: formattedDate,
          time: data.appointment_time,
          service: data.service,
          firstName: data.first_name,
          lastName: data.last_name
        }
      });

      if (gcalError) {
        console.error("Erreur lors de la création de l'événement Google Calendar:", gcalError);
        // Continue anyway as the appointment is created in our database
      }
      
      toast({
        title: "Rendez-vous confirmé",
        description: "Votre rendez-vous a été enregistré avec succès.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erreur lors de la prise de rendez-vous",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-cinzel mb-4">Vos informations</h3>
          <PersonalInfoFields form={form} />
        </div>
        
        {/* Service Selection */}
        <div>
          <h3 className="text-xl font-cinzel mb-4">Choisissez votre soin</h3>
          <ServiceSelection form={form} />
        </div>
        
        {/* Date and Time */}
        <div>
          <h3 className="text-xl font-cinzel mb-4">Date et horaire</h3>
          <DateTimeFields form={form} timeSlots={timeSlots} />
        </div>
        
        {/* Additional Information */}
        <div>
          <h3 className="text-xl font-cinzel mb-4">Informations complémentaires</h3>
          <AdditionalInfo form={form} />
        </div>
        
        {/* Submit */}
        <div className="pt-4">
          <EnergyButton type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement en cours..." : "Confirmer le rendez-vous"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </EnergyButton>
          <p className="text-gray-400 text-sm text-center mt-4">
            En confirmant, vous acceptez nos conditions générales et notre politique de confidentialité.
          </p>
        </div>
      </form>
    </Form>
  );
};
