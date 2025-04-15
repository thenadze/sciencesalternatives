
import { Link } from "react-router-dom";
import { ArrowRight, Star, Heart, Droplet, Sun, User } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { EnergyButton } from "@/components/ui/energy-button";
import { Button } from "@/components/ui/button";

const Index = () => {
  const testimonials = [
    {
      name: "Marie L.",
      text: "Les séances de reiki m'ont apporté une sérénité que je n'avais pas ressentie depuis des années. Un vrai changement dans ma vie quotidienne.",
      stars: 5,
    },
    {
      name: "Jean P.",
      text: "Le magnétisme a considérablement réduit mes douleurs chroniques. Je suis reconnaissant d'avoir découvert cette approche alternative.",
      stars: 5,
    },
    {
      name: "Sophie R.",
      text: "Une expérience apaisante et régénératrice. La bienveillance et le professionnalisme du praticien m'ont mise en confiance dès la première séance.",
      stars: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-mystic-950 via-mystic-900 to-mystic-950 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,89,0.1),transparent_50%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <ScrollObserver>
            <h1 className="text-4xl md:text-6xl font-cinzel mb-6 text-white leading-tight">
              Révélez votre <span className="text-energy-400">énergie</span> intérieure
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Des soins énergétiques personnalisés pour harmoniser votre corps et votre esprit. 
              Découvrez le pouvoir du Reiki et du Magnétisme.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <EnergyButton asChild size="lg">
                <Link to="/rendez-vous">
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </EnergyButton>
              <Button variant="outline" size="lg" asChild className="border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
                <Link to="/services">
                  Découvrir nos soins
                </Link>
              </Button>
            </div>
          </ScrollObserver>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-mystic-950 to-transparent"></div>
      </section>

      {/* Presentation Section - NEW */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,190,89,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <ScrollObserver>
                <div className="relative">
                  <div className="aspect-square rounded-full overflow-hidden border-4 border-energy-400/20">
                    <img 
                      src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80" 
                      alt="Praticien en soins énergétiques" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-mystic-950 border-2 border-energy-400 flex items-center justify-center animate-pulse">
                    <User className="h-10 w-10 text-energy-400" />
                  </div>
                </div>
              </ScrollObserver>
            </div>
            
            <div className="md:col-span-3">
              <ScrollObserver>
                <h2 className="text-3xl md:text-4xl font-cinzel mb-6">
                  <span className="text-energy-400">Découvrez</span> votre praticien
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Passionné par les énergies subtiles et les approches holistiques, je vous accompagne vers l'équilibre et l'harmonie. Mon parcours m'a conduit à explorer différentes techniques de soins énergétiques pour vous offrir une approche personnalisée et bienveillante.
                </p>
                <p className="text-base text-gray-400 mb-8 leading-relaxed">
                  Formé au Reiki traditionnel et aux techniques de magnétisme, je mets mes compétences au service de votre bien-être. Chaque séance est une opportunité de renouer avec votre essence et de libérer les blocages qui entravent votre chemin.
                </p>
                <Button variant="outline" asChild className="border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
                  <Link to="/a-propos">
                    En savoir plus sur mon parcours
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </ScrollObserver>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-cinzel mb-4">
                Nos <span className="text-energy-400">soins</span> énergétiques
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Des thérapies alternatives pour soulager vos maux et retrouver l'équilibre intérieur.
              </p>
            </div>
          </ScrollObserver>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollObserver>
              <div className="bg-mystic-900/80 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/50 hover-glow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-energy-400 to-energy-500 flex items-center justify-center mb-6 energy-pulse">
                  <Sun className="h-7 w-7 text-mystic-950" />
                </div>
                <h3 className="text-xl font-cinzel mb-3 text-white">Reiki</h3>
                <p className="text-gray-400 mb-4">
                  Technique de guérison par l'énergie universelle, le Reiki harmonise les centres énergétiques pour favoriser l'auto-guérison.
                </p>
                <Link to="/services#reiki" className="text-energy-400 inline-flex items-center hover:text-energy-300">
                  En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="bg-mystic-900/80 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/50 hover-glow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-energy-400 to-energy-500 flex items-center justify-center mb-6 energy-pulse">
                  <Heart className="h-7 w-7 text-mystic-950" />
                </div>
                <h3 className="text-xl font-cinzel mb-3 text-white">Magnétisme</h3>
                <p className="text-gray-400 mb-4">
                  Par l'imposition des mains, le magnétisme canalise et transmet l'énergie pour soulager douleurs et blocages énergétiques.
                </p>
                <Link to="/services#magnetisme" className="text-energy-400 inline-flex items-center hover:text-energy-300">
                  En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="bg-mystic-900/80 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/50 hover-glow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-energy-400 to-energy-500 flex items-center justify-center mb-6 energy-pulse">
                  <Droplet className="h-7 w-7 text-mystic-950" />
                </div>
                <h3 className="text-xl font-cinzel mb-3 text-white">Soins énergétiques</h3>
                <p className="text-gray-400 mb-4">
                  Combinaison de différentes techniques pour rétablir la circulation de l'énergie et favoriser votre bien-être global.
                </p>
                <Link to="/services#soins" className="text-energy-400 inline-flex items-center hover:text-energy-300">
                  En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </ScrollObserver>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24 bg-mystic-950/70">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollObserver>
              <div className="relative">
                <div className="aspect-[3/4] rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80" 
                    alt="Praticien en soins énergétiques" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-mystic-950 border-2 border-energy-400 flex items-center justify-center">
                  <span className="text-energy-400 font-cinzel text-lg">15+</span>
                  <span className="text-xs text-gray-400 absolute bottom-5">ans d'exp.</span>
                </div>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div>
                <h2 className="text-3xl md:text-4xl font-cinzel mb-6">
                  La <span className="text-energy-400">passion</span> du bien-être
                </h2>
                <p className="text-gray-300 mb-4">
                  Passionné par les sciences énergétiques depuis plus de 15 ans, j'ai développé une approche personnalisée qui s'adapte aux besoins uniques de chaque personne.
                </p>
                <p className="text-gray-400 mb-6">
                  Mon parcours m'a amené à maîtriser différentes techniques énergétiques que je mets aujourd'hui au service de votre équilibre et de votre bien-être. Chaque séance est une expérience unique, conçue pour vous accompagner vers l'harmonie.
                </p>
                <Button variant="outline" asChild className="border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
                  <Link to="/a-propos">
                    En savoir plus sur mon parcours
                  </Link>
                </Button>
              </div>
            </ScrollObserver>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-cinzel mb-4">
                Témoignages de <span className="text-energy-400">confiance</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Découvrez les expériences de ceux qui ont retrouvé leur équilibre énergétique.
              </p>
            </div>
          </ScrollObserver>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <ScrollObserver key={index}>
                <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/30">
                  <div className="flex text-energy-400 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-energy-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
                  <p className="text-energy-400 font-medium">{testimonial.name}</p>
                </div>
              </ScrollObserver>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="bg-gradient-to-r from-mystic-900 to-mystic-800 rounded-xl p-8 md:p-12 relative overflow-hidden border border-mystic-700/30">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-400 to-soft-600"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(243,190,89,0.2),transparent_70%)]"></div>
              
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-cinzel mb-6">
                  Prêt à découvrir votre <span className="text-energy-400">potentiel énergétique</span> ?
                </h2>
                <p className="text-gray-300 mb-8">
                  Réservez dès maintenant votre séance de soins énergétiques et commencez votre voyage vers l'harmonie intérieure.
                </p>
                <EnergyButton asChild size="lg">
                  <Link to="/rendez-vous">
                    Prendre rendez-vous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </EnergyButton>
              </div>
            </div>
          </ScrollObserver>
        </div>
      </section>
    </div>
  );
};

export default Index;
