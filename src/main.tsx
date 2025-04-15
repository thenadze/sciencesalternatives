
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fonction pour gérer les animations au défilement
const setupScrollObserver = () => {
  // Active les animations uniquement s'il n'y a pas de préférence pour réduire le mouvement
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in-section
    document.querySelectorAll('.fade-in-section').forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Pour les utilisateurs qui préfèrent réduire les animations, on rend tout visible immédiatement
    document.querySelectorAll('.fade-in-section').forEach((element) => {
      element.classList.add('is-visible');
    });
  }
};

// Rendu de l'application React
createRoot(document.getElementById("root")!).render(<App />);

// Activer les animations après le chargement de la page
window.addEventListener('load', setupScrollObserver);
