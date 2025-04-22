
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

/**
 * GoogleCalendarButton
 * Bouton personnalisé pour prise de rendez-vous Google Calendar intégré dans le flux de la page
 */
export const GoogleCalendarButton: React.FC = () => {
  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ09Uv8VuZCgx5hcbNcwlVb86OIci5eVEGpEP4rnkqAIqAf87BaE0mvTcagzmGJu4UFt0J3W2wrP?gv=true";

  return (
    <div className="flex justify-center items-center">
      <Button 
        className="bg-[#278575] hover:bg-[#278575]/90 text-white font-medium py-2 px-4 rounded flex items-center gap-2"
        onClick={() => window.open(calendarUrl, '_blank')}
      >
        <Calendar size={20} />
        Prendre rendez-vous
      </Button>
    </div>
  );
};
