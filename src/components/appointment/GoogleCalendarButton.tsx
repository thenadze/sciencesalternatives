
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleCalendarModal } from "./GoogleCalendarModal";

// Le son court à jouer lors de l'ouverture du toast/modal
const notificationSound = "/lovable-uploads/9dad576e-49e7-423c-a303-7efc65ba9a54.png"; // Remplacer par un .mp3/.wav approprié !

export const GoogleCalendarButton: React.FC = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);

  // Fermeture automatique après 10 secondes
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (modalOpen) {
      timeout = setTimeout(() => {
        setModalOpen(false);
      }, 10000);
    }
    return () => clearTimeout(timeout);
  }, [modalOpen]);

  // Jouer un son discret
  const playSound = () => {
    const audio = new Audio(notificationSound);
    audio.volume = 0.35;
    audio.play().catch(() => {});
  };

  // Ouvre la modal et affiche un toast + son
  const handleOpenCalendar = () => {
    setModalOpen(true);
    playSound();
    toast({
      title: "Réservation de rendez-vous",
      description: "Complétez votre réservation dans la fenêtre Google Calendar qui vient de s'ouvrir.",
      duration: 10000,
      className: "animate-toast-pop"
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Button
        className="bg-gradient-to-r from-mystic-400/80 to-mystic-500/80 hover:from-mystic-400/90 hover:to-mystic-500/90 text-white font-cinzel font-medium py-2 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        onClick={handleOpenCalendar}
      >
        <Calendar size={20} className="text-white/80" />
        Prendre rendez-vous
      </Button>
      <GoogleCalendarModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
