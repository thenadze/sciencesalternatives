
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const GoogleCalendarConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Google Calendar is already connected
    const checkGoogleCalendarConnection = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('google-calendar', {
          body: { action: 'check' }
        });

        if (error) throw error;
        setIsConnected(data.connected);
      } catch (error) {
        console.error('Erreur lors de la vérification de la connexion Google Calendar', error);
      }
    };

    checkGoogleCalendarConnection();
  }, []);

  const connectToGoogleCalendar = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('google-calendar/authorize', {
        method: 'GET'
      });

      if (error) throw error;

      // Redirect to Google's authorization page
      window.location.href = data.url;
    } catch (error) {
      console.error('Erreur de connexion à Google Calendar', error);
      toast({
        title: "Erreur de connexion",
        description: "Un problème est survenu lors de la connexion à Google Calendar.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      onClick={connectToGoogleCalendar}
      variant={isConnected ? 'outline' : 'default'}
      className="gap-2"
    >
      <Calendar className="h-4 w-4" />
      {isConnected ? 'Calendrier connecté' : 'Connecter Google Calendar'}
    </Button>
  );
};
