
import { Link } from "react-router-dom";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";

export function AboutPreviewSection() {
  return (
    <section className="py-16 md:py-24 bg-mystic-950/70">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollObserver>
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img alt="Praticien en soins énergétiques" className="w-full h-full object-cover" src="/lovable-uploads/74b4494b-c462-4a35-b492-16c7dd375d2d.jpg" />
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
  );
}
