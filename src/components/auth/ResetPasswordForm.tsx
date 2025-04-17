
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EnergyButton } from "@/components/ui/energy-button";

const resetPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

type ResetPasswordFormProps = {
  onSubmit: (values: z.infer<typeof resetPasswordSchema>) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
};

export const ResetPasswordForm = ({ onSubmit, onBack, isLoading }: ResetPasswordFormProps) => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    {...field} 
                    placeholder="votre@email.com" 
                    className="pl-10 bg-mystic-800/40 border-mystic-700/50" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button 
            variant="link" 
            type="button" 
            className="px-0 text-energy-400 hover:text-energy-300"
            onClick={onBack}
          >
            Retour à la connexion
          </Button>
        </div>
        <EnergyButton 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer le lien
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </EnergyButton>
      </form>
    </Form>
  );
};
