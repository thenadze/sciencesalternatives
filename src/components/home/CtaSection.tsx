
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { EnergyButton } from "@/components/ui/energy-button";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <ScrollObserver>
          <div className="bg-gradient-to-r from-mystic-900 to-mystic-800 rounded-xl p-8 md:p-12 relative overflow-hidden border border-mystic-700/30 
            transition-all duration-500 group 
            hover:border-energy-400/50 
            hover:shadow-[0_0_20px_rgba(243,190,89,0.4)]
            hover:scale-[1.02]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-400 to-soft-600"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(243,190,89,0.2),transparent_70%)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-cinzel mb-6 
                transition-colors duration-500 
                group-hover:text-energy-400">
                Prêt à découvrir votre <span className="text-energy-400 group-hover:text-white">potentiel énergétique</span> ?
              </h2>
              <p className="text-gray-300 mb-8 
                transition-colors duration-500 
                group-hover:text-white/90">
                Réservez dès maintenant votre séance de soins énergétiques et commencez votre voyage vers l'harmonie intérieure.
              </p>
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-energy-400 via-soft-600 to-energy-400 rounded-lg blur-md opacity-70 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
                <EnergyButton 
                  asChild 
                  size="lg"
                  animatedPulse={true}
                  className="relative px-8 py-4 text-lg font-medium transition-all duration-500 
                    shadow-[0_0_10px_rgba(243,190,89,0.3)]
                    group-hover:shadow-[0_0_20px_rgba(243,190,89,0.7)]
                    hover:scale-105 hover:brightness-110">
                  <Link to="/rendez-vous" className="flex items-center justify-center">
                    Prendre rendez-vous
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </EnergyButton>
              </div>
            </div>
          </div>
        </ScrollObserver>
      </div>
    </section>
  );
}
