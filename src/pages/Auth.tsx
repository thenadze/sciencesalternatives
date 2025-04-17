
import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Mail, User, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { EnergyButton } from "@/components/ui/energy-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const registerSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

type AuthMode = "login" | "register" | "resetPassword";

const Auth = () => {
  const { user, isLoading: authStateLoading, signIn, signUp, resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const [authMode, setAuthMode] = useState<AuthMode>(
    searchParams.get("reset") ? "resetPassword" : "login"
  );
  const [authLoading, setAuthLoading] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setAuthLoading(true);
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    setAuthLoading(true);
    try {
      await signUp(values.email, values.password, values.firstName, values.lastName);
      // Don't auto-switch to login, let the user see the success message
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const onResetPasswordSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setAuthLoading(true);
    try {
      await resetPassword(values.email);
      // After sending reset email, switch back to login
      setAuthMode("login");
    } finally {
      setAuthLoading(false);
    }
  };

  // Rediriger vers la page d'accueil si l'utilisateur est connecté
  if (user && !authStateLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,190,89,0.1),transparent_60%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <ScrollObserver>
            <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
              {authMode === "login" ? "Connexion" : 
               authMode === "register" ? "Inscription" : "Réinitialiser le mot de passe"}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
              {authMode === "login" 
                ? "Accédez à votre espace personnel pour gérer vos rendez-vous" 
                : authMode === "register"
                ? "Créez votre compte pour bénéficier de nos services personnalisés"
                : "Entrez votre email pour recevoir un lien de réinitialisation"}
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* Auth Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="max-w-md mx-auto bg-mystic-900/40 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/30">
              <div className="flex justify-center mb-8">
                <div className="flex rounded-md overflow-hidden">
                  <Button
                    type="button"
                    variant={authMode === "login" ? "default" : "outline"}
                    className={`px-6 ${authMode === "login" ? 'bg-energy-400 text-black' : ''}`}
                    onClick={() => setAuthMode("login")}
                  >
                    Connexion
                  </Button>
                  <Button
                    type="button"
                    variant={authMode === "register" ? "default" : "outline"}
                    className={`px-6 ${authMode === "register" ? 'bg-energy-400 text-black' : ''}`}
                    onClick={() => setAuthMode("register")}
                  >
                    Inscription
                  </Button>
                </div>
              </div>

              {authMode === "login" ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
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
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                {...field} 
                                type="password"
                                placeholder="••••••••" 
                                className="pl-10 bg-mystic-800/40 border-mystic-700/50" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      variant="link" 
                      type="button" 
                      className="px-0 text-energy-400 hover:text-energy-300" 
                      onClick={() => setAuthMode("resetPassword")}
                    >
                      Mot de passe oublié ?
                    </Button>
                    <EnergyButton 
                      type="submit" 
                      className="w-full" 
                      disabled={authLoading}
                    >
                      {authLoading ? (
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
              ) : authMode === "register" ? (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  {...field} 
                                  placeholder="Prénom" 
                                  className="pl-10 bg-mystic-800/40 border-mystic-700/50" 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  {...field} 
                                  placeholder="Nom" 
                                  className="pl-10 bg-mystic-800/40 border-mystic-700/50" 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={registerForm.control}
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
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                {...field} 
                                type="password"
                                placeholder="••••••••" 
                                className="pl-10 bg-mystic-800/40 border-mystic-700/50" 
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
                      disabled={authLoading}
                    >
                      {authLoading ? (
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
              ) : (
                <Form {...resetPasswordForm}>
                  <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-6">
                    <FormField
                      control={resetPasswordForm.control}
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
                        onClick={() => setAuthMode("login")}
                      >
                        Retour à la connexion
                      </Button>
                    </div>
                    <EnergyButton 
                      type="submit" 
                      className="w-full" 
                      disabled={authLoading}
                    >
                      {authLoading ? (
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
              )}
            </div>
          </ScrollObserver>
        </div>
      </section>
    </div>
  );
};

export default Auth;
