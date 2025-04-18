
import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { ExportEmailsButton } from "@/components/auth/ExportEmailsButton";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type AuthMode = "login" | "register" | "resetPassword";

const Auth = () => {
  const { user, isLoading: authStateLoading, signIn, signUp, resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const [authMode, setAuthMode] = useState<AuthMode>(
    searchParams.get("reset") ? "resetPassword" : "login"
  );
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setAuthLoading(true);
    try {
      await signIn(values.email, values.password);
      // Succès géré dans le contexte d'auth
    } catch (error) {
      console.error("Login error:", error);
      // Ne pas afficher de toast ici, l'erreur est gérée dans le formulaire
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (values: { email: string; password: string; firstName: string; lastName: string }) => {
    setAuthLoading(true);
    try {
      await signUp(values.email, values.password, values.firstName, values.lastName);
      // Si nous arrivons ici, l'inscription a réussi, passer automatiquement à la page de connexion
      toast({
        title: "Inscription réussie",
        description: "Vous pouvez maintenant vous connecter avec vos identifiants",
      });
      setAuthMode("login");
    } catch (error) {
      console.error("Registration error:", error);
      // L'erreur est déjà gérée dans le contexte d'auth
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPassword = async (values: { email: string }) => {
    setAuthLoading(true);
    try {
      await resetPassword(values.email);
      setAuthMode("login");
    } finally {
      setAuthLoading(false);
    }
  };

  if (user && !authStateLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-mystic-900 via-mystic-950 to-black">
      {/* Hero Section with enhanced visuals */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-mystic-900/90 to-black/95"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,190,89,0.2),transparent_60%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <ScrollObserver>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl md:text-6xl font-cinzel text-white leading-tight animate-fade-in">
                {authMode === "login" ? "Connexion" : 
                 authMode === "register" ? "Inscription" : "Réinitialiser le mot de passe"}
              </h1>
              {user && <ExportEmailsButton />}
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center animate-fade-in opacity-90">
              {authMode === "login" 
                ? "Accédez à votre espace personnel pour gérer vos rendez-vous" 
                : authMode === "register"
                ? "Créez votre compte pour bénéficier de nos services personnalisés"
                : "Entrez votre email pour recevoir un lien de réinitialisation"}
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* Auth Form Section with enhanced visuals */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <Card className="max-w-md mx-auto overflow-hidden bg-mystic-900/40 backdrop-blur-sm border border-mystic-800/30 shadow-xl hover:shadow-energy-400/5 transition-all duration-500">
              <CardContent className="p-8">
                {authMode !== "resetPassword" && (
                  <div className="flex justify-center mb-8 animate-fade-in">
                    <div className="flex rounded-md overflow-hidden">
                      <Button
                        type="button"
                        variant={authMode === "login" ? "default" : "outline"}
                        className={`px-6 transition-all duration-300 ${
                          authMode === "login" 
                            ? 'bg-gradient-to-r from-energy-400 to-energy-500 text-black shadow-lg hover:shadow-energy-400/50' 
                            : 'hover:bg-energy-400/10'
                        }`}
                        onClick={() => setAuthMode("login")}
                      >
                        Connexion
                      </Button>
                      <Button
                        type="button"
                        variant={authMode === "register" ? "default" : "outline"}
                        className={`px-6 transition-all duration-300 ${
                          authMode === "register" 
                            ? 'bg-gradient-to-r from-energy-400 to-energy-500 text-black shadow-lg hover:shadow-energy-400/50' 
                            : 'hover:bg-energy-400/10'
                        }`}
                        onClick={() => setAuthMode("register")}
                      >
                        Inscription
                      </Button>
                    </div>
                  </div>
                )}

                <div className="animate-fade-in">
                  {authMode === "login" && (
                    <LoginForm 
                      onSubmit={handleLogin}
                      onResetPassword={() => setAuthMode("resetPassword")}
                      isLoading={authLoading}
                    />
                  )}

                  {authMode === "register" && (
                    <RegisterForm
                      onSubmit={handleRegister}
                      isLoading={authLoading}
                    />
                  )}

                  {authMode === "resetPassword" && (
                    <ResetPasswordForm
                      onSubmit={handleResetPassword}
                      onBack={() => setAuthMode("login")}
                      isLoading={authLoading}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </ScrollObserver>
        </div>
      </section>
    </div>
  );
};

export default Auth;
