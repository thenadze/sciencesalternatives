
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { ProfileCard } from "@/components/client-space/ProfileCard";
import { AppointmentList } from "@/components/client-space/AppointmentList";

type Appointment = {
  id: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
};

type UserProfile = {
  first_name: string;
  last_name: string;
};

const ClientSpace = () => {
  const { user, isLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      // Récupérer le profil utilisateur
      const fetchProfile = async () => {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error("Erreur lors de la récupération du profil:", profileError);
        } else {
          setProfile(profileData);
        }
      };
      
      // Récupérer les rendez-vous de l'utilisateur
      const fetchAppointments = async () => {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('user_id', user.id)
          .order('appointment_date', { ascending: true });
          
        if (error) {
          console.error("Erreur lors de la récupération des rendez-vous:", error);
          toast({
            title: "Erreur de chargement",
            description: "Impossible de charger vos rendez-vous.",
            variant: "destructive",
          });
        } else {
          setAppointments(data || []);
        }
        
        setIsLoaded(true);
      };
      
      fetchProfile();
      fetchAppointments();
    }
  }, [user, toast]);

  const handleCancelAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', id);
        
      if (error) throw error;
      
      // Mettre à jour l'état local
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: 'cancelled' } : app
      ));
      
      toast({
        title: "Rendez-vous annulé",
        description: "Votre rendez-vous a été annulé avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur lors de l'annulation",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
  if (!isLoading && !user) {
    return <Navigate to="/auth" />;
  }

  // Filtrer les rendez-vous à venir (aujourd'hui ou plus tard)
  const upcomingAppointments = appointments.filter(app => {
    const appDate = new Date(app.appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appDate >= today && app.status !== 'cancelled';
  });

  // Filtrer les rendez-vous passés ou annulés
  const pastAppointments = appointments.filter(app => {
    const appDate = new Date(app.appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appDate < today || app.status === 'cancelled';
  });

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
              Votre <span className="text-energy-400">espace personnel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
              Gérez vos rendez-vous et suivez votre parcours énergétique
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* User Dashboard */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="max-w-4xl mx-auto">
              {/* User Profile Card */}
              <ProfileCard 
                firstName={profile?.first_name}
                lastName={profile?.last_name}
                email={user?.email}
                onLogout={signOut}
              />
              
              {/* Appointments */}
              <AppointmentList 
                isLoaded={isLoaded}
                upcomingAppointments={upcomingAppointments}
                pastAppointments={pastAppointments}
                onCancelAppointment={handleCancelAppointment}
              />
            </div>
          </ScrollObserver>
        </div>
      </section>
    </div>
  );
};

export default ClientSpace;
