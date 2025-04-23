
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie si l'animation a déjà été vue
    if (sessionStorage.getItem('introAnimationSeen')) {
      setIsVisible(false);
      return;
    }

    // Marquer l'animation comme vue
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('introAnimationSeen', 'true');
      
      // Scroll smooth vers la section d'accueil
      const element = document.getElementById('accueil');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-mystic-950"
    >
      <div className="relative">
        {/* Effet d'aura énergétique */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-energy-400/30 to-mystic-400/30 animate-pulse-glow" />
        
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative text-4xl md:text-6xl lg:text-7xl font-cinzel text-white text-center uppercase tracking-wider"
        >
          Révélez votre{' '}
          <span className="bg-gradient-to-r from-energy-400 to-mystic-400 text-transparent bg-clip-text">
            énergie
          </span>{' '}
          intérieure
        </motion.h1>
      </div>
    </motion.div>
  );
};
