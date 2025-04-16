
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Sun, Heart, Droplet } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { EnergyButton } from "@/components/ui/energy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const appointmentSchema = z.object({
  service: z.string().min(1, "Veuillez sélectionner un service"),
  appointment_date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  appointment_time: z.string().min(1, "Veuillez sélectionner un horaire"),
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Veuillez entrer un email valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const Appointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Pré-remplir le formulaire avec les informations du profil de l'utilisateur
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (data && !error) {
          form.setValue('first_name', data.first_name || '');
          form.setValue('last_name', data.last_name || '');
          form.setValue('email', user.email || '');
        }
      };
      
      fetchProfile();
    }
  }, [user, form]);

  const onSubmit = async (data: AppointmentFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('appointments').insert({
        user_id: user.id,
        service: data.service,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        message: data.message || '',
      });
      
      if (error) throw error;
      
      toast({
        title: "Rendez-vous confirmé",
        description: "Votre rendez-vous a été enregistré avec succès.",
      });
      
      // Rediriger vers l'espace client
      navigate('/espace-personnel');
    } catch (error: any) {
      toast({
        title: "Erreur lors de la prise de rendez-vous",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
  if (!isLoading && !user) {
    return <Navigate to="/auth" />;
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
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-cinzel mb-4">Vos informations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Votre prénom" 
                                className="bg-mystic-800/40 border-mystic-700/50" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Votre nom" 
                                className="bg-mystic-800/40 border-mystic-700/50" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email" 
                                placeholder="Votre email" 
                                className="bg-mystic-800/40 border-mystic-700/50" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="tel" 
                                placeholder="Votre numéro de téléphone" 
                                className="bg-mystic-800/40 border-mystic-700/50" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Service Selection */}
                  <div>
                    <h3 className="text-xl font-cinzel mb-4">Choisissez votre soin</h3>
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={field.onChange} 
                              value={field.value}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              <div className={`bg-mystic-800/40 backdrop-blur-sm rounded-lg p-4 border ${field.value === "reiki" ? "border-energy-400" : "border-mystic-700/30"} cursor-pointer transition-colors duration-300 hover:border-energy-400/50`}>
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
                              
                              <div className={`bg-mystic-800/40 backdrop-blur-sm rounded-lg p-4 border ${field.value === "magnetisme" ? "border-energy-400" : "border-mystic-700/30"} cursor-pointer transition-colors duration-300 hover:border-energy-400/50`}>
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
                              
                              <div className={`bg-mystic-800/40 backdrop-blur-sm rounded-lg p-4 border ${field.value === "combined" ? "border-energy-400" : "border-mystic-700/30"} cursor-pointer transition-colors duration-300 hover:border-energy-400/50`}>
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Date and Time */}
                  <div>
                    <h3 className="text-xl font-cinzel mb-4">Date et horaire</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="appointment_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Sélectionnez une date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"} bg-mystic-800/40 border-mystic-700/50`}
                                  >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appointment_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sélectionnez un horaire</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full bg-mystic-800/40 border-mystic-700/50">
                                  <SelectValue placeholder="Choisir un horaire" />
                                </SelectTrigger>
                              </FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  <div>
                    <h3 className="text-xl font-cinzel mb-4">Informations complémentaires</h3>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Partagez toute information qui pourrait être utile pour votre séance (préoccupations particulières, problèmes de santé, etc.)" 
                              className="bg-mystic-800/40 border-mystic-700/50 resize-none h-24" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Submit */}
                  <div className="pt-4">
                    <EnergyButton type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Enregistrement en cours..." : "Confirmer le rendez-vous"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </EnergyButton>
                    <p className="text-gray-400 text-sm text-center mt-4">
                      En confirmant, vous acceptez nos conditions générales et notre politique de confidentialité.
                    </p>
                  </div>
                </form>
              </Form>
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
