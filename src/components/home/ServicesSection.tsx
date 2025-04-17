
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { ServiceCard } from "./ServiceCard";
import { Sun, Heart, Droplet } from "lucide-react";

export function ServicesSection() {
  return (
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
            <ServiceCard 
              icon={Sun}
              title="Reiki"
              description="Technique de guérison par l'énergie universelle, le Reiki harmonise les centres énergétiques pour favoriser l'auto-guérison."
              linkId="reiki"
            />
          </ScrollObserver>

          <ScrollObserver>
            <ServiceCard 
              icon={Heart}
              title="Magnétisme"
              description="Par l'imposition des mains, le magnétisme canalise et transmet l'énergie pour soulager douleurs et blocages énergétiques."
              linkId="magnetisme"
            />
          </ScrollObserver>

          <ScrollObserver>
            <ServiceCard 
              icon={Droplet}
              title="Soins énergétiques"
              description="Combinaison de différentes techniques pour rétablir la circulation de l'énergie et favoriser votre bien-être global."
              linkId="soins"
            />
          </ScrollObserver>
        </div>
      </div>
    </section>
  );
}
