
import { useState } from "react";
import { ArrowRight, Calendar, Clock, Sun, Heart, Droplet } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { EnergyButton } from "@/components/ui/energy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Appointment = () => {
  const [date, setDate] = useState<Date>();
  const [service, setService] = useState<string>("");
  
  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];
  
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
              Prendre <span className="text-energy-400">rendez-vous</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
              Réservez votre séance de soins énergétiques en quelques clics
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="max-w-4xl mx-auto bg-mystic-900/40 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/30">
              <h2 className="text-2xl font-cinzel mb-8 text-center">
                Planifiez votre <span className="text-energy-400">séance</span>
              </h2>
              
              <form className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-cinzel mb-4">Vos informations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Votre prénom" 
                        className="bg-mystic-800/40 border-mystic-700/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Votre nom" 
                        className="bg-mystic-800/40 border-mystic-700/50" 
                      />
                    </div>
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
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="Votre numéro de téléphone" 
                        className="bg-mystic-800/40 border-mystic-700/50" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Service Selection */}
                <div>
                  <h3 className="text-xl font-cinzel mb-4">Choisissez votre soin</h3>
                  <RadioGroup value={service} onValueChange={setService} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`bg-mystic-800/40 backdrop-blur-sm rounded-lg p-4 border ${service === "reiki" ? "border-energy-400" : "border-mystic-700/30"} cursor-pointer transition-colors duration-300 hover:border-energy-400/50`}>
                      <RadioGroupItem value="reiki" id="reiki" className="sr-only" />
                      <Label 
                        htmlFor="reiki" 
                        className="cursor-pointer flex flex-col items-center text-center h-full"
                      >
                        <span className="w-12 h-12 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mb-3">
                          <Sun className="h-6 w-6 text-energy-400" />
                        </span>
                        <span className="font-cinzel text-lg mb-1">Reiki</span>
                        <span className="text-sm text-gray-400 mb-2">60 minutes</span>
                        <span className="text-energy-400 font-cinzel">70€</span>
                      </Label>
                    </div>
                    
                    <div className={`bg-mystic-800/40 backdrop-blur-sm rounded-lg p-4 border ${service === "magnetisme" ? "border-energy-400" : "border-mystic-700/30"} cursor-pointer transition-colors duration-300 hover:border-energy-400/50`}>
                      <RadioGroupItem value="magnetisme" id="magnetisme" className="sr-only" />
                      <Label 
                        htmlFor="magnetisme" 
                        className="cursor-pointer flex flex-col items-center text-center h-full"
                      >
                        <span className="w-12 h-12 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mb-3">
                          <Heart className="h-6 w-6 text-energy-400" />
                        </span>
                        <span className="font-cinzel text-lg mb-1">Magnétisme</span>
                        <span className="text-sm text-gray-400 mb-2">60 minutes</span>
                        <span className="text-energy-400 font-cinzel">80€</span>
                      </Label>
                    </div>
                    
                    <div className={`bg-mystic-800/40 backdrop-blur-sm rounded-lg p-4 border ${service === "combined" ? "border-energy-400" : "border-mystic-700/30"} cursor-pointer transition-colors duration-300 hover:border-energy-400/50`}>
                      <RadioGroupItem value="combined" id="combined" className="sr-only" />
                      <Label 
                        htmlFor="combined" 
                        className="cursor-pointer flex flex-col items-center text-center h-full"
                      >
                        <span className="w-12 h-12 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mb-3">
                          <Droplet className="h-6 w-6 text-energy-400" />
                        </span>
                        <span className="font-cinzel text-lg mb-1">Soins combinés</span>
                        <span className="text-sm text-gray-400 mb-2">75 minutes</span>
                        <span className="text-energy-400 font-cinzel">90€</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Date and Time */}
                <div>
                  <h3 className="text-xl font-cinzel mb-4">Date et horaire</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-2 block">Sélectionnez une date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"} bg-mystic-800/40 border-mystic-700/50`}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Sélectionnez un horaire</Label>
                      <Select>
                        <SelectTrigger className="w-full bg-mystic-800/40 border-mystic-700/50">
                          <SelectValue placeholder="Choisir un horaire" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                {time}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Additional Information */}
                <div>
                  <h3 className="text-xl font-cinzel mb-4">Informations complémentaires</h3>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (optionnel)</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Partagez toute information qui pourrait être utile pour votre séance (préoccupations particulières, problèmes de santé, etc.)" 
                      className="bg-mystic-800/40 border-mystic-700/50 resize-none h-24" 
                    />
                  </div>
                </div>
                
                {/* Submit */}
                <div className="pt-4">
                  <EnergyButton type="button" className="w-full">
                    Confirmer le rendez-vous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </EnergyButton>
                  <p className="text-gray-400 text-sm text-center mt-4">
                    En confirmant, vous acceptez nos conditions générales et notre politique de confidentialité.
                  </p>
                </div>
              </form>
            </div>
          </ScrollObserver>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-cinzel mb-4">
                Questions <span className="text-energy-400">fréquentes</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Tout ce que vous devez savoir avant votre rendez-vous
              </p>
            </div>
          </ScrollObserver>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                <h3 className="text-lg font-cinzel mb-3 text-energy-400">Que dois-je porter ?</h3>
                <p className="text-gray-400">
                  Des vêtements confortables et amples. Les soins se pratiquent habillé, mais il est préférable d'éviter les tissus synthétiques.
                </p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                <h3 className="text-lg font-cinzel mb-3 text-energy-400">Comment me préparer ?</h3>
                <p className="text-gray-400">
                  Évitez les repas lourds et l'alcool avant la séance. Si possible, prévoyez un moment de calme après la séance pour intégrer les bienfaits.
                </p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                <h3 className="text-lg font-cinzel mb-3 text-energy-400">Politique d'annulation</h3>
                <p className="text-gray-400">
                  Toute annulation doit être faite au moins 24h à l'avance. Passé ce délai, la séance sera facturée à 50%.
                </p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                <h3 className="text-lg font-cinzel mb-3 text-energy-400">Moyens de paiement</h3>
                <p className="text-gray-400">
                  Nous acceptons les paiements par carte bancaire, espèces ou virement bancaire. Le règlement s'effectue à la fin de la séance.
                </p>
              </div>
            </ScrollObserver>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
