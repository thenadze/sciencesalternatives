
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EnergyButton } from "@/components/ui/energy-button";

const registerSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type RegisterFormProps = {
  onSubmit: (values: z.infer<typeof registerSchema>) => Promise<void>;
  isLoading: boolean;
};

export const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-gray-200">Prénom</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-energy-400" />
                    <Input 
                      {...field} 
                      placeholder="Prénom" 
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-gray-200">Nom</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-energy-400" />
                    <Input 
                      {...field} 
                      placeholder="Nom" 
                      className="pl-10 bg-mystic-800/40 border-mystic-700/50 hover:border-energy-400/50 transition-colors" 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-gray-200">Email</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-energy-400" />
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
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-hover:text-energy-400" />
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
        <EnergyButton 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Inscription en cours...
            </>
          ) : (
            <>
              S'inscrire
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </EnergyButton>
      </form>
    </Form>
  );
};
