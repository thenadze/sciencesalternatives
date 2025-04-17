
import { Link } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";

export function PractitionerSection() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,190,89,0.05),transparent_60%)]"></div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <ScrollObserver>
              <div className="relative">
                <div className="aspect-square rounded-full overflow-hidden border-4 border-energy-400/20">
                  <img alt="Praticien en soins énergétiques" className="w-full h-full object-cover" src="/lovable-uploads/884dbae3-5f72-4cf5-a892-be05a0c10757.png" />
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
  );
}
