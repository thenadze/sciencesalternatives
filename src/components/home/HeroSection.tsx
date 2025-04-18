import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { EnergyButton } from "@/components/ui/energy-button";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    const buttonTimer = setTimeout(() => {
      setIsButtonAnimated(true);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
    };
  }, []);
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-mystic-950 via-mystic-900 to-mystic-950 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,89,0.1),transparent_50%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div>
          <h1 
            className={`text-4xl md:text-6xl font-cinzel mb-6 text-white leading-tight transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Révélez votre <span className="text-energy-400">énergie</span> intérieure
          </h1>
          <p 
            className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Des soins énergétiques personnalisés par Portfolio Énergies pour harmoniser votre corps et votre esprit. 
            Découvrez le pouvoir du Reiki et du Magnétisme.
          </p>
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div 
              className={`relative transition-all duration-1000 ${isButtonAnimated ? 'scale-105' : 'scale-100'}`}
            >
              <div 
                className={`absolute inset-0 bg-energy-400/20 blur-xl rounded-full transition-opacity duration-1000 ${isButtonAnimated ? 'opacity-70 animate-pulse-glow' : 'opacity-0'}`} 
              />
              
              <EnergyButton 
                asChild 
                size="lg" 
                animatedPulse={true} 
                className="relative z-10 shadow-lg shadow-energy-400/30 border-2 border-energy-400 px-8 py-6 text-lg font-bold"
              >
                <Link to="/rendez-vous" className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 animate-pulse-glow" />
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </EnergyButton>
            </div>
            
            <Button variant="outline" size="lg" asChild className="border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
              <Link to="/services">
                Découvrir nos soins
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-mystic-950 to-transparent"></div>
    </section>
  );
}
