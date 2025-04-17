import { ScrollObserver } from "@/components/ui/scroll-observer";
import { BookOpen, Heart, Star, Users } from "lucide-react";
import { HeroSection } from "@/components/about/HeroSection";
import { JourneySection } from "@/components/about/JourneySection";
import { QualificationCard } from "@/components/about/QualificationCard";
import { ValueCard } from "@/components/about/ValueCard";

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
      <HeroSection />
      <JourneySection />

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
                <QualificationCard 
                  key={index}
                  {...qualification}
                  index={index}
                />
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
              <ValueCard key={index} {...value} />
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
