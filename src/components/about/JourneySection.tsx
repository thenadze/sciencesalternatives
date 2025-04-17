
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Award, Heart } from "lucide-react";

export const JourneySection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollObserver>
            <div className="text-center md:text-left">
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
  );
};
