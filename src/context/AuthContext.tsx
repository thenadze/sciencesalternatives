import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      console.log("Tentative d'inscription avec:", { email, firstName, lastName });
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: undefined,
        },
      });

      if (error) {
        console.error("Erreur d'inscription:", error);
        throw error;
      }
      
      console.log("Inscription réussie:", data);
      
      if (data?.user?.identities?.length === 0) {
        toast({
          title: "Compte déjà existant",
          description: "Un compte avec cet email existe déjà. Veuillez vous connecter.",
          variant: "destructive",
        });
      } else {
        try {
          console.log("Tentative d'envoi d'email de confirmation à:", email);
          const emailResponse = await supabase.functions.invoke('send-confirmation', {
            body: { email, firstName }
          });
          
          console.log("Réponse de la fonction d'envoi d'email:", emailResponse);
          
          toast({
            title: "Inscription réussie",
            description: "Votre compte a été créé avec succès",
          });
        } catch (emailError) {
          console.error("Erreur lors de l'envoi de l'email de bienvenue:", emailError);
          toast({
            title: "Inscription réussie",
            description: "Votre compte a été créé avec succès",
          });
        }
      }
    } catch (error: any) {
      console.error("Erreur d'inscription interceptée:", error);
      
      let errorMessage = "Une erreur s'est produite lors de l'inscription";
      
      if (error.message.includes("confirmation email")) {
        errorMessage = "Problème lors de l'envoi de l'email de confirmation, mais votre compte a bien été créé. Veuillez vous connecter.";
        try {
          await signIn(email, password);
          return;
        } catch (signInError) {
          console.error("Erreur lors de la tentative de connexion après échec d'email:", signInError);
        }
      }
      
      toast({
        title: "Erreur d'inscription",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting signin with:", email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Signin error:", error);
        throw error;
      }
      
      console.log("Signin success:", data);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace personnel",
      });
    } catch (error: any) {
      console.error("Caught signin error:", error);
      let errorMessage = "Identifiants incorrects";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou mot de passe incorrect";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Veuillez confirmer votre email avant de vous connecter";
      }
      
      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/auth?reset=true",
      });
      
      if (error) throw error;
      
      toast({
        title: "Email envoyé",
        description: "Consultez votre boîte mail pour réinitialiser votre mot de passe",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error: any) {
      toast({
        title: "Erreur lors de la déconnexion",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signUp, 
      signIn, 
      signOut,
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
