
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "./types";

interface AdditionalInfoProps {
  form: UseFormReturn<AppointmentFormValues>;
}

export const AdditionalInfo = ({ form }: AdditionalInfoProps) => {
  return (
    <div className="space-y-2">
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
  );
};
