
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

export const GoogleCalendarConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // Vérifier si l'utilisateur revient de la page d'autorisation Google
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('calendar_connected') === 'true') {
      setIsConnected(true);
      toast({
        title: "Calendrier connecté",
        description: "Votre Google Calendar a été connecté avec succès.",
      });
    } else if (searchParams.get('calendar_error') === 'true') {
      toast({
        title: "Erreur de connexion",
        description: "Un problème est survenu lors de la connexion à Google Calendar.",
        variant: "destructive"
      });
    }

    // Vérifier si Google Calendar est déjà connecté
    const checkGoogleCalendarConnection = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.functions.invoke('google-calendar', {
          body: { action: 'check' }
        });

        if (error) throw error;
        setIsConnected(data?.connected || false);
      } catch (error) {
        console.error('Erreur lors de la vérification de la connexion Google Calendar', error);
        // Ne pas afficher de toast ici pour éviter de submerger l'utilisateur avec des messages d'erreur
      } finally {
        setIsLoading(false);
      }
    };

    checkGoogleCalendarConnection();
  }, [location.search, toast]);

  const connectToGoogleCalendar = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('google-calendar/authorize');

      if (error) throw error;

      // Rediriger vers la page d'autorisation de Google
      window.location.href = data.url;
    } catch (error) {
      console.error('Erreur de connexion à Google Calendar', error);
      toast({
        title: "Erreur de connexion",
        description: "Un problème est survenu lors de la connexion à Google Calendar.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={connectToGoogleCalendar}
      variant={isConnected ? 'outline' : 'default'}
      className="gap-2"
      disabled={isLoading}
    >
      <Calendar className="h-4 w-4" />
      {isLoading 
        ? 'Chargement...' 
        : isConnected 
          ? 'Calendrier connecté' 
          : 'Connecter Google Calendar'}
    </Button>
  );
};
