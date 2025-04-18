
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export const GoogleCalendarConnect = () => {
  const [isConnected, setIsConnected] = useState(false);

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
    }
  };

  return (
    <Button 
      onClick={connectToGoogleCalendar}
      variant={isConnected ? 'outline' : 'default'}
    >
      {isConnected ? 'Calendrier connecté' : 'Connecter Google Calendar'}
    </Button>
  );
};
