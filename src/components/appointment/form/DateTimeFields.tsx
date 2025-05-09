
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Clock } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "./types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DateTimeFieldsProps {
  form: UseFormReturn<AppointmentFormValues>;
  timeSlots: string[];
}

export const DateTimeFields = ({ form, timeSlots }: DateTimeFieldsProps) => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>(timeSlots);
  const [isLoading, setIsLoading] = useState(false);
  const selectedDate = form.watch("appointment_date");
  
  useEffect(() => {
    const checkAvailability = async () => {
      if (!selectedDate) {
        setAvailableTimeSlots(timeSlots);
        return;
      }
      
      setIsLoading(true);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      
      try {
        // Vérifier les rendez-vous existants dans Supabase
        const { data: bookedAppointments, error: supabaseError } = await supabase
          .from('appointments')
          .select('appointment_time')
          .eq('appointment_date', formattedDate)
          .neq('status', 'cancelled');
        
        if (supabaseError) throw supabaseError;
        
        // Obtenir les heures réservées de Supabase
        const bookedTimes = new Set(bookedAppointments.map(app => app.appointment_time));
        
        // Filtrer d'abord les créneaux déjà réservés dans la base de données
        const slotsAfterDbCheck = timeSlots.filter(time => !bookedTimes.has(time));
        
        try {
          // Essayer de vérifier chaque créneau horaire dans Google Calendar
          // Si ça échoue, on continuera avec les créneaux filtrés par la base de données
          const availableSlots = [];
          for (const time of slotsAfterDbCheck) {
            try {
              const { data } = await supabase.functions.invoke('google-calendar', {
                body: { action: 'check', date: formattedDate, time }
              });
              
              // Si nous n'avons pas d'info claire sur la disponibilité, on considère disponible
              if (data?.available !== false) {
                availableSlots.push(time);
              }
            } catch (e) {
              // En cas d'erreur, on considère le créneau comme disponible
              availableSlots.push(time);
            }
          }
          
          setAvailableTimeSlots(availableSlots.length > 0 ? availableSlots : slotsAfterDbCheck);
        } catch (error) {
          // En cas d'erreur globale avec Google Calendar, on utilise simplement
          // les créneaux filtrés par la base de données
          console.error("Erreur lors de la vérification Google Calendar:", error);
          setAvailableTimeSlots(slotsAfterDbCheck);
        }
        
        // Si l'heure actuellement sélectionnée n'est plus disponible, la réinitialiser
        const currentTime = form.getValues("appointment_time");
        if (currentTime && !availableTimeSlots.includes(currentTime)) {
          form.setValue("appointment_time", "");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des disponibilités:", error);
        // En cas d'erreur, on garde tous les créneaux par défaut
        setAvailableTimeSlots(timeSlots);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAvailability();
  }, [selectedDate, form, timeSlots]);

  return (
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
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                      "bg-mystic-800/40 border-mystic-700/50"
                    )}
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
                  onSelect={(date) => {
                    field.onChange(date);
                    form.setValue("appointment_time", "");
                  }}
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
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={isLoading || !selectedDate || availableTimeSlots.length === 0}
            >
              <FormControl>
                <SelectTrigger className="w-full bg-mystic-800/40 border-mystic-700/50">
                  <SelectValue placeholder={
                    isLoading 
                      ? "Chargement des disponibilités..." 
                      : !selectedDate 
                      ? "Sélectionnez d'abord une date" 
                      : availableTimeSlots.length === 0 
                      ? "Aucun horaire disponible" 
                      : "Choisir un horaire"
                  } />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableTimeSlots.length === 0 ? (
                  <div className="px-2 py-4 text-center text-sm">
                    {!selectedDate 
                      ? "Veuillez d'abord sélectionner une date" 
                      : "Aucun horaire disponible pour cette date"}
                  </div>
                ) : (
                  availableTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
