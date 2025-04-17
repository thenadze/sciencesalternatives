
import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

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
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (values: { email: string; password: string; firstName: string; lastName: string }) => {
    setAuthLoading(true);
    try {
      await signUp(values.email, values.password, values.firstName, values.lastName);
    } catch (error) {
      console.error("Registration error:", error);
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

      {/* Auth Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="max-w-md mx-auto bg-mystic-900/40 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/30">
              {authMode !== "resetPassword" && (
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
              )}

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
          </ScrollObserver>
        </div>
      </section>
    </div>
  );
};

export default Auth;
