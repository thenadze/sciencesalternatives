
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export const GoogleCalendarButton: React.FC = () => {
  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ09Uv8VuZCgx5hcbNcwlVb86OIci5eVEGpEP4rnkqAIqAf87BaE0mvTcagzmGJu4UFt0J3W2wrP?gv=true";

  return (
    <div className="flex justify-center items-center">
      <Button 
        className="bg-gradient-to-r from-mystic-400/80 to-mystic-500/80 hover:from-mystic-400/90 hover:to-mystic-500/90 text-white font-cinzel font-medium py-2 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        onClick={() => window.open(calendarUrl, '_blank')}
      >
        <Calendar size={20} className="text-white/80" />
        Prendre rendez-vous
      </Button>
    </div>
  );
};

