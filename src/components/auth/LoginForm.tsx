
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EnergyButton } from "@/components/ui/energy-button";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormProps = {
  onSubmit: (values: z.infer<typeof loginSchema>) => Promise<void>;
  onResetPassword: () => void;
  isLoading: boolean;
};

export const LoginForm = ({ onSubmit, onResetPassword, isLoading }: LoginFormProps) => {
  const [authError, setAuthError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setAuthError(null); // Reset error on new submission
    try {
      await onSubmit(values);
    } catch (error: any) {
      // Capture and display authentication errors
      if (error?.message?.includes("Invalid login credentials")) {
        setAuthError("Email ou mot de passe incorrect");
      } else if (error?.message?.includes("Email not confirmed")) {
        setAuthError("Veuillez confirmer votre email avant de vous connecter");
      } else {
        setAuthError(error?.message || "Une erreur est survenue lors de la connexion");
      }
      console.error("Login form error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {authError && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-100">
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-gray-200">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    {...field} 
                    placeholder="votre@email.com" 
                    className="pl-10 bg-mystic-800/40 border-mystic-700/50 hover:border-energy-400/50 transition-colors" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-gray-200">Mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    {...field} 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 bg-mystic-800/40 border-mystic-700/50 hover:border-energy-400/50 transition-colors" 
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
            onClick={onResetPassword}
          >
            Mot de passe oublié ?
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
              Connexion en cours...
            </>
          ) : (
            <>
              Se connecter
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </EnergyButton>
      </form>
    </Form>
  );
};
