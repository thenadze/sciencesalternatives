import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (sessionStorage.getItem('introAnimationSeen')) {
      setIsVisible(false);
      return;
    }

    const displayDuration = 3000;
    const fadeOutDuration = 1500;
    
    sessionStorage.setItem('introAnimationSeen', 'true');
    
    const displayTimer = setTimeout(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        document.body.style.overflow = 'hidden';
        
        const accueilSection = document.getElementById('accueil');
        
        if (accueilSection) {
          accueilSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
          
          setTimeout(() => {
            document.body.style.overflow = '';
          }, 1000);
        }
      }, fadeOutDuration);
    }, displayDuration);

    return () => {
      clearTimeout(displayTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  const energieTextArray = "ÉNERGIE".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-mystic-950"
        >
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

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(243,190,89,0.1)_100%)] animate-pulse" />
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 blur-[100px] bg-gradient-to-r from-energy-400/20 via-mystic-400/20 to-energy-400/20 animate-pulse-slow rounded-full" />
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-energy-400/30 to-mystic-400/30 animate-pulse-glow" />
            
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
              }}
              className="relative text-4xl md:text-6xl lg:text-7xl font-cinzel text-white text-center uppercase tracking-widest leading-relaxed"
            >
              Révélez votre{' '}
              <span className="inline-flex bg-gradient-to-r from-energy-400 via-mystic-400 to-energy-400 text-transparent bg-clip-text font-semibold">
                {energieTextArray.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>{' '}
              intérieure
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
