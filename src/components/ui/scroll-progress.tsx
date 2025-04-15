
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate how far down the page the user has scrolled
      if (documentHeight - windowHeight > 0) {
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollProgress(progress);
      }
    };

    // Set up event listeners
    window.addEventListener("scroll", calculateScrollProgress);
    window.addEventListener("resize", calculateScrollProgress);
    
    // Initial calculation
    calculateScrollProgress();
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
      window.removeEventListener("resize", calculateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <Progress 
        value={scrollProgress} 
        className="w-full h-1 bg-transparent rounded-none" 
        indicatorClassName="bg-gradient-to-r from-energy-300 to-energy-400 transition-transform duration-150 ease-out" 
      />
    </div>
  );
}
