
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if animation has been shown before
    if (sessionStorage.getItem('introAnimationSeen')) {
      setIsVisible(false);
      return;
    }

    // Set timer for animation duration
    const displayDuration = 3000; // 3 secondes pour l'affichage principal
    const fadeOutDuration = 1500; // 1.5 secondes pour le fondu
    
    // Marquer l'animation comme vue
    sessionStorage.setItem('introAnimationSeen', 'true');
    
    // Première étape : attendre la durée d'affichage puis déclencher le fondu
    const displayTimer = setTimeout(() => {
      // Lancer le fade-out en modifiant l'état (cela déclenche l'animation exit de framer-motion)
      setIsVisible(false);
      
      // Seconde étape : attendre la fin de l'animation de fondu avant de scroller
      setTimeout(() => {
        // Localiser précisément la section d'accueil
        const accueilSection = document.getElementById('accueil');
        
        if (accueilSection) {
          // Utiliser window.scrollTo pour un défilement fluide
          window.scrollTo({
            top: accueilSection.offsetTop,
            behavior: 'smooth'
          });
        }
      }, fadeOutDuration); // Attendre que le fade-out soit presque terminé
      
    }, displayDuration);

    return () => {
      clearTimeout(displayTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-mystic-950"
        >
          {/* Floating particles background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-energy-400/20"
                initial={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: Math.random() * 1.5 + 0.5,
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Energy waves */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(243,190,89,0.1)_100%)] animate-pulse" />
          </motion.div>

          <div className="relative">
            {/* Enhanced energy aura */}
            <div className="absolute inset-0 blur-[100px] bg-gradient-to-r from-energy-400/20 via-mystic-400/20 to-energy-400/20 animate-pulse-slow rounded-full" />
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-energy-400/30 to-mystic-400/30 animate-pulse-glow" />
            
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                textShadow: ["0 0 10px rgba(243,190,89,0.3)", "0 0 20px rgba(243,190,89,0.5)", "0 0 10px rgba(243,190,89,0.3)"]
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              className="relative text-4xl md:text-6xl lg:text-7xl font-cinzel text-white text-center uppercase tracking-widest leading-relaxed"
            >
              Révélez votre{' '}
              <span className="bg-gradient-to-r from-energy-400 via-mystic-400 to-energy-400 text-transparent bg-clip-text font-semibold">
                énergie
              </span>{' '}
              intérieure
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
