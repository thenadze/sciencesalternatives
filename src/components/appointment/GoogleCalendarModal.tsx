
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface GoogleCalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoogleCalendarModal: React.FC<GoogleCalendarModalProps> = ({
  open,
  onOpenChange,
}) => {
  // L’URL doit pointer sur la page publique Google Calendar d’horaires
  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ09Uv8VuZCgx5hcbNcwlVb86OIci5eVEGpEP4rnkqAIqAf87BaE0mvTcagzmGJu4UFt0J3W2wrP?gv=true";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col p-0 overflow-hidden bg-white dark:bg-mystic-950 border-none shadow-2xl">
        <div className="flex justify-end items-center p-2 bg-mystic-950/90">
          <button
            className="p-2 rounded-full hover:bg-mystic-900/60 focus:outline-none"
            onClick={() => onOpenChange(false)}
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <iframe
          src={calendarUrl}
          className="flex-1 w-full border-none"
          style={{ minHeight: 600 }}
          title="Réserver un créneau Google Calendar"
          allow="clipboard-write"
        />
      </DialogContent>
    </Dialog>
  );
};

