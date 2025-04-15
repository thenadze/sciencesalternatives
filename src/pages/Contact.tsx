
import { ArrowRight, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EnergyButton } from "@/components/ui/energy-button";

const Contact = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,89,0.1),transparent_60%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <ScrollObserver>
            <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
              Contactez-<span className="text-energy-400">nous</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
              Une question, une demande particulière ou envie de prendre rendez-vous ? 
              N'hésitez pas à nous contacter.
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/30">
                <h2 className="text-2xl font-cinzel mb-6">
                  Envoyez-nous un <span className="text-energy-400">message</span>
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-gray-300 block">Nom</label>
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="Votre nom" 
                        className="bg-mystic-800/40 border-mystic-700/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-gray-300 block">Email</label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Votre email" 
                        className="bg-mystic-800/40 border-mystic-700/50" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-gray-300 block">Sujet</label>
                    <Input 
                      id="subject" 
                      type="text" 
                      placeholder="Sujet de votre message" 
                      className="bg-mystic-800/40 border-mystic-700/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-gray-300 block">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Votre message" 
                      rows={6}
                      className="bg-mystic-800/40 border-mystic-700/50 resize-none" 
                    />
                  </div>
                  <EnergyButton type="button" className="w-full">
                    Envoyer le message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </EnergyButton>
                </form>
              </div>
            </ScrollObserver>

            {/* Contact Information */}
            <div className="space-y-8">
              <ScrollObserver>
                <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/30">
                  <h2 className="text-2xl font-cinzel mb-6">
                    Informations de <span className="text-energy-400">contact</span>
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-energy-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-cinzel mb-1">Adresse</h3>
                        <p className="text-gray-400">123 Rue de l'Harmonie<br />75001 Paris, France</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-energy-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-cinzel mb-1">Téléphone</h3>
                        <p className="text-gray-400">+33 1 23 45 67 89</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-energy-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-cinzel mb-1">Email</h3>
                        <p className="text-gray-400">contact@harmonie-energetique.fr</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-energy-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-cinzel mb-1">Horaires</h3>
                        <p className="text-gray-400">
                          Lundi - Vendredi: 9h - 19h<br />
                          Samedi: 10h - 17h<br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollObserver>

              <ScrollObserver>
                <div className="bg-gradient-to-br from-mystic-900 to-mystic-800 rounded-lg p-8 border border-mystic-700/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-400 to-soft-600"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-cinzel mb-4">
                      Besoin d'un rendez-vous <span className="text-energy-400">rapidement</span> ?
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Vous préférez nous appeler ou prendre directement rendez-vous en ligne ? N'hésitez pas à utiliser l'un de ces moyens :
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline" asChild>
                        <a href="tel:+33123456789" className="flex items-center justify-center">
                          <Phone className="mr-2 h-4 w-4" /> Appelez-nous
                        </a>
                      </Button>
                      <EnergyButton asChild className="w-full">
                        <a href="/rendez-vous" className="flex items-center justify-center">
                          <ArrowRight className="mr-2 h-4 w-4" /> Prendre rendez-vous
                        </a>
                      </EnergyButton>
                    </div>
                  </div>
                </div>
              </ScrollObserver>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="rounded-lg overflow-hidden border border-mystic-800/30 aspect-[16/8]">
              <div className="w-full h-full bg-mystic-900/40 flex items-center justify-center text-center p-6">
                <div>
                  <p className="text-gray-400 mb-4">
                    Carte interactive indisponible - Remplacez cet élément par une iframe Google Maps
                  </p>
                  <p className="text-gray-300 font-cinzel">
                    123 Rue de l'Harmonie, 75001 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </ScrollObserver>
        </div>
      </section>
    </div>
  );
};

export default Contact;
