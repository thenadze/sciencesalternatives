
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowRight, Calendar as CalendarIcon, User, LogOut, PlusCircle } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { EnergyButton } from "@/components/ui/energy-button";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  const getServiceIcon = (service: string) => {
    switch(service) {
      case 'reiki': return <Calendar className="h-5 w-5 text-energy-400" />;
      case 'magnetisme': return <Calendar className="h-5 w-5 text-energy-400" />;
      case 'combined': return <Calendar className="h-5 w-5 text-energy-400" />;
      default: return <Calendar className="h-5 w-5 text-energy-400" />;
    }
  };

  const getServiceName = (service: string) => {
    switch(service) {
      case 'reiki': return "Reiki";
      case 'magnetisme': return "Magnétisme";
      case 'combined': return "Soins combinés";
      default: return service;
    }
  };

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
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-energy-400/20 border border-energy-400/30 flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-energy-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-cinzel">
                        {profile ? `${profile.first_name} ${profile.last_name}` : user?.email}
                      </h2>
                      <p className="text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profil
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Votre profil</DialogTitle>
                          <DialogDescription>
                            Consultez et modifiez vos informations personnelles
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-center text-gray-400 mb-4">
                            Cette fonctionnalité sera bientôt disponible.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      className="flex items-center border-destructive text-destructive hover:bg-destructive/10"
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Appointments */}
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg border border-mystic-800/30 overflow-hidden">
                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-xl font-cinzel">Vos rendez-vous</h3>
                  <EnergyButton asChild size="sm">
                    <Link to="/rendez-vous">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Nouveau rendez-vous
                    </Link>
                  </EnergyButton>
                </div>
                
                <Tabs defaultValue="upcoming" className="w-full">
                  <div className="px-6 border-b border-mystic-800/30">
                    <TabsList className="bg-transparent border-b-0 mb-0 justify-start">
                      <TabsTrigger value="upcoming" className="bg-transparent data-[state=active]:bg-mystic-800/40">
                        À venir ({upcomingAppointments.length})
                      </TabsTrigger>
                      <TabsTrigger value="past" className="bg-transparent data-[state=active]:bg-mystic-800/40">
                        Historique ({pastAppointments.length})
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="upcoming" className="mt-0 p-0">
                    <div className="divide-y divide-mystic-800/30">
                      {isLoaded ? (
                        upcomingAppointments.length > 0 ? (
                          upcomingAppointments.map((appointment) => (
                            <div key={appointment.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="flex items-start mb-4 md:mb-0">
                                <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mr-4 mt-1">
                                  {getServiceIcon(appointment.service)}
                                </div>
                                <div>
                                  <h4 className="text-lg font-cinzel text-energy-400">
                                    {getServiceName(appointment.service)}
                                  </h4>
                                  <div className="flex flex-col md:flex-row md:space-x-4 space-y-1 md:space-y-0 text-gray-400 text-sm mt-1">
                                    <div className="flex items-center">
                                      <CalendarIcon className="h-4 w-4 mr-1" />
                                      <span>
                                        {format(new Date(appointment.appointment_date), "EEEE d MMMM yyyy", { locale: fr })}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      <span>{appointment.appointment_time}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-3">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-destructive text-destructive hover:bg-destructive/10"
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                >
                                  Annuler
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <p className="text-gray-400 mb-4">Vous n'avez pas de rendez-vous à venir.</p>
                            <EnergyButton asChild>
                              <Link to="/rendez-vous">
                                Prendre rendez-vous
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </EnergyButton>
                          </div>
                        )
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-gray-400">Chargement de vos rendez-vous...</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past" className="mt-0 p-0">
                    <div className="divide-y divide-mystic-800/30">
                      {isLoaded ? (
                        pastAppointments.length > 0 ? (
                          pastAppointments.map((appointment) => (
                            <div key={appointment.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between opacity-75">
                              <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mr-4 mt-1">
                                  {getServiceIcon(appointment.service)}
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <h4 className="text-lg font-cinzel text-energy-400">
                                      {getServiceName(appointment.service)}
                                    </h4>
                                    {appointment.status === 'cancelled' && (
                                      <span className="ml-2 text-xs uppercase bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                                        Annulé
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-col md:flex-row md:space-x-4 space-y-1 md:space-y-0 text-gray-400 text-sm mt-1">
                                    <div className="flex items-center">
                                      <CalendarIcon className="h-4 w-4 mr-1" />
                                      <span>
                                        {format(new Date(appointment.appointment_date), "EEEE d MMMM yyyy", { locale: fr })}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      <span>{appointment.appointment_time}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <p className="text-gray-400">Vous n'avez pas d'historique de rendez-vous.</p>
                          </div>
                        )
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-gray-400">Chargement de vos rendez-vous...</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ScrollObserver>
        </div>
      </section>
    </div>
  );
};

export default ClientSpace;
