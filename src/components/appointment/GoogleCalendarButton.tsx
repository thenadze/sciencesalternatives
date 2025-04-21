
import React, { useEffect, useRef } from "react";

/**
 * GoogleCalendarButton
 * Affiche un bouton rendez-vous Google Calendar customisé et centré
 */
export const GoogleCalendarButton: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vérifier si le script n'est pas déjà chargé
    if (!document.getElementById("google-calendar-script")) {
      const script = document.createElement("script");
      script.id = "google-calendar-script";
      script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
      script.async = true;
      document.body.appendChild(script);

      // Une fois chargé, loader le bouton
      script.onload = () => {
        if (window.calendar && ref.current) {
          window.calendar.schedulingButton.load({
            url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ09Uv8VuZCgx5hcbNcwlVb86OIci5eVEGpEP4rnkqAIqAf87BaE0mvTcagzmGJu4UFt0J3W2wrP?gv=true",
            color: "#278575",
            label: "Prendre rendez-vous",
            target: ref.current,
          });
        }
      };
    } else {
      // Si déjà chargé, loader directement
      if (window.calendar && ref.current) {
        window.calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ09Uv8VuZCgx5hcbNcwlVb86OIci5eVEGpEP4rnkqAIqAf87BaE0mvTcagzmGJu4UFt0J3W2wrP?gv=true",
          color: "#278575",
          label: "Prendre rendez-vous",
          target: ref.current,
        });
      }
    }
  }, []);

  return (
    <section className="flex justify-center my-8">
      <div ref={ref} />
    </section>
  );
};

// Ajout du type global pour éviter l'erreur TS.
declare global {
  interface Window {
    calendar?: any;
  }
}
