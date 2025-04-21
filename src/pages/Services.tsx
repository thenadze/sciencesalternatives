
import { Link } from "react-router-dom";
import { ArrowRight, Check, Droplet, Heart, Sun } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { EnergyButton } from "@/components/ui/energy-button";

const Services = () => {
  const services = [
    {
      id: "reiki",
      icon: <Sun className="h-10 w-10 text-energy-400" />,
      title: "Reiki",
      description: "Le Reiki est une méthode de soins énergétiques d'origine japonaise qui permet de canaliser l'énergie universelle pour favoriser l'équilibre et stimuler les capacités d'auto-guérison du corps.",
      benefits: [
        "Réduction du stress et de l'anxiété",
        "Amélioration de la qualité du sommeil",
        "Renforcement du système immunitaire",
        "Soulagement des douleurs physiques",
        "Harmonisation des centres énergétiques",
        "Accompagnement dans les périodes de transition",
        "Je suis vraiment un problème avec le back pour connecter le rendez-vous à une base connectée"
      ],
      price: "70€",
      duration: "60 minutes"
    },
    {
      id: "magnetisme",
      icon: <Heart className="h-10 w-10 text-energy-400" />,
      title: "Magnétisme",
      description: "Le magnétisme utilise l'énergie vitale du praticien, transmise par les mains, pour rééquilibrer le champ énergétique du receveur et faciliter la circulation de l'énergie là où elle est bloquée.",
      benefits: [
        "Soulagement des douleurs chroniques",
        "Accélération de la guérison des blessures",
        "Réduction des inflammations",
        "Déblocage des nœuds énergétiques",
        "Revitalisation des organes affaiblis",
        "Équilibrage du système nerveux"
      ],
      price: "80€",
      duration: "60 minutes"
    },
    {
      id: "soins",
      icon: <Droplet className="h-10 w-10 text-energy-400" />,
      title: "Soins énergétiques combinés",
      description: "Une approche personnalisée combinant différentes techniques énergétiques adaptées à vos besoins spécifiques pour un rééquilibrage profond et une harmonisation globale.",
      benefits: [
        "Traitement personnalisé selon vos besoins",
        "Combinaison de différentes techniques",
        "Approche holistique corps-esprit",
        "Libération des blocages émotionnels profonds",
        "Reconnexion à votre essence spirituelle",
        "Accompagnement personnalisé dans votre évolution"
      ],
      price: "90€",
      duration: "75 minutes"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(243,190,89,0.1),transparent_60%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <ScrollObserver>
            <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
              Nos <span className="text-energy-400">services</span> énergétiques
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
              Découvrez nos soins pour harmoniser votre énergie et retrouver l'équilibre
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-20 md:space-y-32">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-24">
                <ScrollObserver>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-mystic-900 border border-energy-400/30 flex items-center justify-center mr-4">
                          {service.icon}
                        </div>
                        <h2 className="text-3xl font-cinzel">{service.title}</h2>
                      </div>
                      
                      <p className="text-gray-300 mb-6">
                        {service.description}
                      </p>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-cinzel mb-4 text-energy-400">Bienfaits</h3>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-energy-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-400">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 items-center mb-6">
                        <div className="bg-mystic-900/60 px-4 py-3 rounded-lg border border-mystic-800/50">
                          <span className="text-gray-400 text-sm">Prix</span>
                          <p className="text-energy-400 font-cinzel text-xl">{service.price}</p>
                        </div>
                        <div className="bg-mystic-900/60 px-4 py-3 rounded-lg border border-mystic-800/50">
                          <span className="text-gray-400 text-sm">Durée</span>
                          <p className="text-energy-400 font-cinzel text-xl">{service.duration}</p>
                        </div>
                      </div>
                      
                      <EnergyButton asChild>
                        <Link to="/rendez-vous">
                          Prendre rendez-vous
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </EnergyButton>
                    </div>
                    
                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="relative">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden">
                          <img 
                            src={`https://images.unsplash.com/photo-15${1500000000 + index * 10000000}?auto=format&fit=crop&q=80`} 
                            alt={service.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-mystic-950/40 to-transparent"></div>
                        <div className="absolute -bottom-4 -right-4 bg-mystic-950 p-4 rounded-lg border border-energy-400/30">
                          {service.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollObserver>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-mystic-950/70">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-cinzel mb-4">
                Questions <span className="text-energy-400">fréquentes</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Tout ce que vous devez savoir avant votre première séance
              </p>
            </div>
          </ScrollObserver>

          <div className="max-w-3xl mx-auto space-y-6">
            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                <h3 className="text-xl font-cinzel mb-3 text-energy-400">Comment se déroule une séance ?</h3>
                <p className="text-gray-400">
                  Chaque séance débute par un temps d'échange pour comprendre vos besoins. Ensuite, confortablement installé(e) et habillé(e), vous vous allongez sur une table de massage. Le praticien pose ses mains sur ou au-dessus de différentes parties de votre corps pour transmettre l'énergie. La séance se termine par un temps de partage sur votre ressenti.
                </p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                <h3 className="text-xl font-cinzel mb-3 text-energy-400">Que vais-je ressentir pendant une séance ?</h3>
                <p className="text-gray-400">
                  Les sensations varient d'une personne à l'autre : chaleur, picotements, légèreté, lourdeur... Certains ne ressentent rien de particulier mais observent des effets positifs après la séance. D'autres peuvent entrer dans un état de profonde relaxation ou même s'endormir.
                </p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                <h3 className="text-xl font-cinzel mb-3 text-energy-400">Combien de séances sont nécessaires ?</h3>
                <p className="text-gray-400">
                  Cela dépend de votre situation. Pour un simple rééquilibrage ou une détente, une séance peut suffire. Pour des problématiques plus profondes ou chroniques, un suivi de 3 à 5 séances espacées de 2 à 3 semaines est généralement recommandé. Nous évaluons ensemble vos besoins après chaque séance.
                </p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                <h3 className="text-xl font-cinzel mb-3 text-energy-400">Les soins énergétiques remplacent-ils la médecine conventionnelle ?</h3>
                <p className="text-gray-400">
                  Non, les soins énergétiques sont complémentaires à la médecine conventionnelle, jamais substitutifs. Ils peuvent accompagner votre traitement médical en favorisant le bien-être et en soutenant les capacités naturelles de votre corps. Consultez toujours votre médecin pour tout problème de santé.
                </p>
              </div>
            </ScrollObserver>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="bg-gradient-to-r from-mystic-900 to-mystic-800 rounded-xl p-8 md:p-12 relative overflow-hidden border border-mystic-700/30">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-400 to-soft-600"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(243,190,89,0.2),transparent_70%)]"></div>
              
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-cinzel mb-6">
                  Prêt à <span className="text-energy-400">retrouver l'équilibre</span> ?
                </h2>
                <p className="text-gray-300 mb-8">
                  Offrez-vous un moment de soin et d'harmonie. Prenez rendez-vous pour une séance adaptée à vos besoins.
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

export default Services;
