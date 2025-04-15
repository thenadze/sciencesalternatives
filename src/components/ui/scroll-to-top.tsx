
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Montrer le bouton lorsque l'utilisateur défile plus bas que 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Nettoyage des écouteurs d'événements
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Fonction pour scroller vers le haut en douceur
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-mystic-900/60 backdrop-blur-sm border border-energy-400/20",
        "hover:bg-mystic-800/70 hover:border-energy-400/30 hover:translate-y-[-4px]",
        "transition-all duration-300 ease-in-out shadow-lg",
        "flex items-center justify-center",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
      )}
      aria-label="Remonter en haut de la page"
    >
      <ArrowUp 
        className="h-5 w-5 text-energy-400 drop-shadow-md" 
      />
    </button>
  );
}
