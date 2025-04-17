
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { EnergyButton } from "@/components/ui/energy-button";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
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
  );
}
