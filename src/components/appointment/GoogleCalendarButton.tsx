
import React, { useEffect, useRef } from "react";
import { EnergyButton } from "@/components/ui/energy-button";

/**
 * GoogleCalendarButton
 * Bouton personnalisé pour prise de rendez-vous Google Calendar intégré dans le flux de la page
 */
export const GoogleCalendarButton: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById("google-calendar-script")) {
      const script = document.createElement("script");
      script.id = "google-calendar-script";
      script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
      script.async = true;
      document.body.appendChild(script);

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
    <div className="flex justify-center items-center">
      <div ref={ref} className="inline-block" />
    </div>
  );
};

// Typage global pour éviter les erreurs TS
declare global {
  interface Window {
    calendar?: any;
  }
}
