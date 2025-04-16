
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { EnergyButton } from "@/components/ui/energy-button";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { ServiceSelectionCard } from "./ServiceSelectionCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const appointmentSchema = z.object({
  service: z.string().min(1, "Veuillez sélectionner un service"),
  appointment_date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  appointment_time: z.string().min(1, "Veuillez sélectionner un horaire"),
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Veuillez entrer un email valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export const AppointmentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
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
  
  // Effet pour pré-remplir le formulaire avec les informations du profil utilisateur est géré dans le composant parent

  const onSubmit = async (data: AppointmentFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Conversion de la date en string pour correspondre au schéma de la base de données
      const formattedDate = format(data.appointment_date, 'yyyy-MM-dd');
      
      const { error } = await supabase.from('appointments').insert({
        user_id: user.id,
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
      
      toast({
        title: "Rendez-vous confirmé",
        description: "Votre rendez-vous a été enregistré avec succès.",
      });
      
      // Rediriger vers l'espace client
      navigate('/espace-personnel');
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Votre prénom" 
                      className="bg-mystic-800/40 border-mystic-700/50" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Votre nom" 
                      className="bg-mystic-800/40 border-mystic-700/50" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder="Votre email" 
                      className="bg-mystic-800/40 border-mystic-700/50" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="tel" 
                      placeholder="Votre numéro de téléphone" 
                      className="bg-mystic-800/40 border-mystic-700/50" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Service Selection */}
        <div>
          <h3 className="text-xl font-cinzel mb-4">Choisissez votre soin</h3>
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <ServiceSelectionCard 
                      value="reiki" 
                      id="reiki" 
                      title="Reiki" 
                      duration="60 minutes" 
                      price="70€" 
                      icon="reiki"
                      selected={field.value === "reiki"}
                    />
                    
                    <ServiceSelectionCard 
                      value="magnetisme" 
                      id="magnetisme" 
                      title="Magnétisme" 
                      duration="60 minutes" 
                      price="80€" 
                      icon="magnetisme"
                      selected={field.value === "magnetisme"}
                    />
                    
                    <ServiceSelectionCard 
                      value="combined" 
                      id="combined" 
                      title="Soins combinés" 
                      duration="75 minutes" 
                      price="90€" 
                      icon="combined"
                      selected={field.value === "combined"}
                    />
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Date and Time */}
        <div>
          <h3 className="text-xl font-cinzel mb-4">Date et horaire</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="appointment_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sélectionnez une date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"} bg-mystic-800/40 border-mystic-700/50`}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="appointment_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sélectionnez un horaire</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-mystic-800/40 border-mystic-700/50">
                        <SelectValue placeholder="Choisir un horaire" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Additional Information */}
        <div>
          <h3 className="text-xl font-cinzel mb-4">Informations complémentaires</h3>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (optionnel)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Partagez toute information qui pourrait être utile pour votre séance (préoccupations particulières, problèmes de santé, etc.)" 
                    className="bg-mystic-800/40 border-mystic-700/50 resize-none h-24" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
