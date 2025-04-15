
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Award, BookOpen, Heart, Star, Users } from "lucide-react";

const About = () => {
  const qualifications = [
    { 
      year: "2008", 
      title: "Maître Reiki - 3ème degré", 
      institution: "Institut International de Reiki" 
    },
    { 
      year: "2010", 
      title: "Certification en Magnétisme", 
      institution: "École Française de Magnétisme" 
    },
    { 
      year: "2012", 
      title: "Formation en Thérapie Énergétique", 
      institution: "Centre d'Énergétique Holistique" 
    },
    { 
      year: "2015", 
      title: "Maître Reiki - 4ème degré", 
      institution: "Institut International de Reiki" 
    },
    { 
      year: "2018", 
      title: "Perfectionnement en Soins Énergétiques", 
      institution: "Académie des Sciences Énergétiques" 
    },
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6 text-energy-400" />,
      title: "Bienveillance",
      description: "Chaque personne est accueillie avec respect et bienveillance, dans un espace sécurisant."
    },
    {
      icon: <Star className="h-6 w-6 text-energy-400" />,
      title: "Excellence",
      description: "Je m'engage à offrir des soins de la plus haute qualité, résultat de formations continues."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-energy-400" />,
      title: "Savoir",
      description: "Je cultive la connaissance et partage mon expertise pour vous autonomiser dans votre parcours."
    },
    {
      icon: <Users className="h-6 w-6 text-energy-400" />,
      title: "Respect",
      description: "Votre unicité est honorée, et l'approche thérapeutique s'adapte à vos besoins spécifiques."
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,190,89,0.1),transparent_60%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <ScrollObserver>
            <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
              À propos de <span className="text-energy-400">votre praticien</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
              Un parcours dédié à l'harmonie énergétique et au bien-être des personnes
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* Personal Journey */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollObserver>
              <div>
                <h2 className="text-3xl font-cinzel mb-6">
                  Mon <span className="text-energy-400">parcours</span>
                </h2>
                <p className="text-gray-300 mb-4">
                  Passionné par les sciences énergétiques depuis plus de 15 ans, mon chemin vers ces pratiques a commencé après une expérience personnelle transformatrice qui m'a ouvert aux possibilités de guérison au-delà de l'approche conventionnelle.
                </p>
                <p className="text-gray-400 mb-4">
                  Après des années dans un environnement professionnel exigeant, j'ai ressenti le besoin de me reconnecter à l'essentiel et d'explorer les dimensions subtiles de l'être humain. Cette quête m'a conduit à étudier différentes traditions énergétiques à travers le monde.
                </p>
                <p className="text-gray-400">
                  Aujourd'hui, je combine ces connaissances pour offrir une approche holistique et personnalisée, adaptée aux besoins uniques de chaque personne que j'accompagne vers l'équilibre et le bien-être.
                </p>
              </div>
            </ScrollObserver>

            <ScrollObserver>
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80" 
                    alt="Parcours du praticien" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -left-4 bg-mystic-950 p-4 rounded-lg border border-energy-400/30">
                  <Award className="h-10 w-10 text-energy-400" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-mystic-950 p-4 rounded-lg border border-energy-400/30">
                  <Heart className="h-10 w-10 text-energy-400" />
                </div>
              </div>
            </ScrollObserver>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 md:py-20 bg-mystic-950/70">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-cinzel mb-4">
                <span className="text-energy-400">Formations</span> & Certifications
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Un parcours d'apprentissage continu pour vous offrir des soins de qualité
              </p>
            </div>
          </ScrollObserver>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-energy-400/20"></div>
            <div className="space-y-10">
              {qualifications.map((qualification, index) => (
                <ScrollObserver key={index}>
                  <div className={`relative flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 flex justify-center md:px-10">
                      <div className="bg-mystic-900/60 backdrop-blur-sm p-6 rounded-lg border border-mystic-800/50 md:w-[90%]">
                        <div className="font-cinzel text-energy-400 text-lg mb-1">{qualification.title}</div>
                        <div className="text-gray-400 mb-1">{qualification.institution}</div>
                        <div className="text-gray-500 text-sm">{qualification.year}</div>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-mystic-950 border-2 border-energy-400"></div>
                    </div>
                  </div>
                </ScrollObserver>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-cinzel mb-4">
                Mes <span className="text-energy-400">valeurs</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Les principes qui guident ma pratique et mon accompagnement
              </p>
            </div>
          </ScrollObserver>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollObserver key={index}>
                <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30 hover:border-energy-400/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-mystic-950 flex items-center justify-center mb-4 border border-energy-400/30">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-cinzel mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </ScrollObserver>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-mystic-900 to-mystic-950">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollObserver>
              <h2 className="text-3xl font-cinzel mb-8">
                Ma <span className="text-energy-400">philosophie</span>
              </h2>
              <p className="text-gray-300 mb-6 text-lg italic">
                "Je crois profondément que chaque personne possède en elle les ressources nécessaires à sa guérison. Mon rôle est simplement d'accompagner, de faciliter la reconnexion avec cette sagesse intérieure et de créer les conditions propices à l'auto-guérison."
              </p>
              <p className="text-gray-400">
                Mon approche allie respect des traditions ancestrales et ouverture aux connaissances contemporaines. Chaque séance est personnalisée pour répondre aux besoins uniques de la personne, dans une vision holistique qui considère l'être dans toutes ses dimensions : physique, émotionnelle, mentale et spirituelle.
              </p>
            </ScrollObserver>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
