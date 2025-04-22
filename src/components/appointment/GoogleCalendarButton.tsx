
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleCalendarModal } from "./GoogleCalendarModal";

// Remplacer par un fichier audio .mp3 approprié
const notificationSound = "/lovable-uploads/notification-sound.mp3";

export const GoogleCalendarButton: React.FC = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Initialiser l'audio une seule fois
  React.useEffect(() => {
    audioRef.current = new Audio(notificationSound);
    audioRef.current.volume = 0.35;
  }, []);

  // Suppression du useEffect de fermeture automatique après 10 secondes

  // Jouer un son discret avec gestion des erreurs
  const playSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.warn("Audio play failed:", error);
        });
      }
    } catch (error) {
      console.warn("Sound playing error:", error);
    }
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
