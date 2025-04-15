
import { Link } from "react-router-dom";
import { Download, FileText, Lock, LogIn, User, Video, Calendar, MessageSquare, Play } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EnergyButton } from "@/components/ui/energy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClientSpace = () => {
  // Placeholder state - would be connected to Supabase auth
  const isLoggedIn = false; 
  
  // Placeholder user data - would come from Supabase
  const userData = {
    name: "Marie Durand",
    email: "marie.durand@example.com",
    lastVisit: "15 mars 2025",
    nextAppointment: "22 avril 2025 à 14:00",
  };
  
  // Placeholder resources - would come from Supabase database
  const resources = {
    documents: [
      { id: 1, title: "Guide de méditation quotidienne", type: "PDF", date: "12 avril 2025", size: "1.2 MB" },
      { id: 2, title: "Exercices de respiration", type: "PDF", date: "28 mars 2025", size: "850 KB" },
      { id: 3, title: "Journal énergétique personnel", type: "PDF", date: "15 mars 2025", size: "1.5 MB" },
    ],
    videos: [
      { id: 1, title: "Méditation guidée - 15 min", duration: "15:23", date: "10 avril 2025", thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80" },
      { id: 2, title: "Pratiques d'auto-soin énergétique", duration: "22:45", date: "25 mars 2025", thumbnail: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80" },
    ],
    appointments: [
      { id: 1, date: "12 mars 2025", time: "14:00", service: "Reiki", notes: "Première séance très bénéfique. Travail sur les chakras supérieurs." },
      { id: 2, date: "28 février 2025", time: "10:30", service: "Magnétisme", notes: "Soulagement significatif des douleurs dorsales. À poursuivre." },
    ]
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,190,89,0.1),transparent_70%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <ScrollObserver>
            <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
              Espace <span className="text-energy-400">personnel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
              Accédez à vos ressources personnalisées et gérez vos rendez-vous
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* Client Space Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {!isLoggedIn ? (
            <ScrollObserver>
              <div className="max-w-md mx-auto bg-mystic-900/40 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/30">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-energy-400" />
                  </div>
                  <h2 className="text-2xl font-cinzel mb-2">Connexion</h2>
                  <p className="text-gray-400">
                    Connectez-vous pour accéder à votre espace personnel
                  </p>
                </div>
                
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Votre email" 
                      className="bg-mystic-800/40 border-mystic-700/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <a href="#" className="text-energy-400 text-sm hover:text-energy-300">
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Votre mot de passe" 
                      className="bg-mystic-800/40 border-mystic-700/50" 
                    />
                  </div>
                  
                  <EnergyButton type="button" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" /> Se connecter
                  </EnergyButton>
                </form>
                
                <div className="mt-6 pt-6 border-t border-mystic-800/30 text-center">
                  <p className="text-gray-400 mb-4">
                    Vous n'avez pas encore de compte ?
                  </p>
                  <Button variant="outline" className="w-full border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
                    <User className="mr-2 h-4 w-4" /> Créer un compte
                  </Button>
                </div>
              </div>
              
              <div className="max-w-3xl mx-auto mt-16 text-center">
                <h3 className="text-2xl font-cinzel mb-6">
                  Avantages de l'espace <span className="text-energy-400">personnel</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                    <div className="w-12 h-12 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-energy-400" />
                    </div>
                    <h4 className="font-cinzel text-lg mb-2">Ressources personnalisées</h4>
                    <p className="text-gray-400">
                      Accédez à des documents et vidéos adaptés à votre parcours énergétique.
                    </p>
                  </div>
                  
                  <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                    <div className="w-12 h-12 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-energy-400" />
                    </div>
                    <h4 className="font-cinzel text-lg mb-2">Gestion des rendez-vous</h4>
                    <p className="text-gray-400">
                      Consultez l'historique de vos séances et prenez facilement de nouveaux rendez-vous.
                    </p>
                  </div>
                  
                  <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                    <div className="w-12 h-12 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6 text-energy-400" />
                    </div>
                    <h4 className="font-cinzel text-lg mb-2">Communication facilitée</h4>
                    <p className="text-gray-400">
                      Échangez directement avec votre praticien pour un suivi personnalisé.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollObserver>
          ) : (
            <div>
              <ScrollObserver>
                <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30 mb-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mr-4">
                        <User className="h-8 w-8 text-energy-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-cinzel">{userData.name}</h2>
                        <p className="text-gray-400">{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" asChild className="border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
                        <Link to="/rendez-vous">
                          Nouveau rendez-vous
                        </Link>
                      </Button>
                      <Button variant="ghost">
                        Déconnexion
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollObserver>
              
              <ScrollObserver>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                    <h3 className="font-cinzel text-lg mb-3">Dernière visite</h3>
                    <p className="text-energy-400 font-cinzel text-xl">{userData.lastVisit}</p>
                  </div>
                  
                  <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                    <h3 className="font-cinzel text-lg mb-3">Prochain rendez-vous</h3>
                    <p className="text-energy-400 font-cinzel text-xl">{userData.nextAppointment}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-mystic-900 to-mystic-800 rounded-lg p-6 border border-mystic-700/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-400 to-soft-600"></div>
                    <h3 className="font-cinzel text-lg mb-3">Besoin d'aide ?</h3>
                    <p className="text-gray-400 mb-3">Une question ou préoccupation ?</p>
                    <Button asChild className="bg-energy-400 hover:bg-energy-500 text-mystic-950">
                      <Link to="/contact">
                        Contactez-nous
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollObserver>
              
              <ScrollObserver>
                <Tabs defaultValue="documents" className="w-full">
                  <TabsList className="w-full justify-start mb-6 bg-mystic-900/40 border border-mystic-800/30">
                    <TabsTrigger value="documents" className="data-[state=active]:bg-energy-400/20 data-[state=active]:text-energy-400">
                      <FileText className="mr-2 h-4 w-4" /> Documents
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="data-[state=active]:bg-energy-400/20 data-[state=active]:text-energy-400">
                      <Video className="mr-2 h-4 w-4" /> Vidéos
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-energy-400/20 data-[state=active]:text-energy-400">
                      <Calendar className="mr-2 h-4 w-4" /> Historique
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="documents">
                    <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                      <h3 className="text-2xl font-cinzel mb-6">
                        Vos <span className="text-energy-400">documents</span>
                      </h3>
                      
                      <div className="space-y-4">
                        {resources.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 border border-mystic-800/30 rounded-lg bg-mystic-900/40">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mr-3">
                                <FileText className="h-5 w-5 text-energy-400" />
                              </div>
                              <div>
                                <h4 className="text-lg font-medium">{doc.title}</h4>
                                <p className="text-gray-400 text-sm">
                                  {doc.type} • {doc.size} • Ajouté le {doc.date}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-5 w-5 text-energy-400" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="videos">
                    <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                      <h3 className="text-2xl font-cinzel mb-6">
                        Vos <span className="text-energy-400">vidéos</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resources.videos.map((video) => (
                          <div key={video.id} className="border border-mystic-800/30 rounded-lg overflow-hidden bg-mystic-900/40">
                            <div className="aspect-video relative">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-mystic-950/40 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-energy-400/90 flex items-center justify-center cursor-pointer hover:bg-energy-400 transition-colors">
                                  <Play className="h-8 w-8 text-mystic-950" />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="text-lg font-medium mb-1">{video.title}</h4>
                              <p className="text-gray-400 text-sm">
                                {video.duration} • Ajouté le {video.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                      <h3 className="text-2xl font-cinzel mb-6">
                        Historique de vos <span className="text-energy-400">séances</span>
                      </h3>
                      
                      <div className="space-y-6">
                        {resources.appointments.map((apt) => (
                          <div key={apt.id} className="border border-mystic-800/30 rounded-lg p-4 bg-mystic-900/40">
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mr-3">
                                <Calendar className="h-5 w-5 text-energy-400" />
                              </div>
                              <div>
                                <h4 className="text-lg font-medium">{apt.service}</h4>
                                <p className="text-gray-400 text-sm">
                                  {apt.date} à {apt.time}
                                </p>
                              </div>
                            </div>
                            <div className="pl-13">
                              <h5 className="text-sm font-medium mb-1 text-energy-400">Notes</h5>
                              <p className="text-gray-400">{apt.notes}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollObserver>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClientSpace;
