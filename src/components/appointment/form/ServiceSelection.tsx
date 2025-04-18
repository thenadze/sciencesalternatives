
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { ServiceSelectionCard } from "../ServiceSelectionCard";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "./types";

interface ServiceSelectionProps {
  form: UseFormReturn<AppointmentFormValues>;
}

export const ServiceSelection = ({ form }: ServiceSelectionProps) => {
  return (
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
  );
};
