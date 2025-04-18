
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
const CALENDAR_ID = 'primary'; // Using primary calendar, you can change this to a specific calendar ID

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AppointmentRequest {
  date: string;
  time: string;
  service: string;
  firstName: string;
  lastName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...data } = await req.json();

    switch (action) {
      case 'check':
        return await checkAvailability(data.date, data.time);
      case 'create':
        return await createEvent(data as AppointmentRequest);
      default:
        throw new Error('Action non reconnue');
    }
  } catch (error) {
    console.error('Erreur:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function checkAvailability(date: string, time: string) {
  const startTime = new Date(`${date}T${time}`);
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?` + new URLSearchParams({
    timeMin: startTime.toISOString(),
    timeMax: endTime.toISOString(),
    singleEvents: 'true',
    key: GOOGLE_API_KEY as string
  });

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Erreur Google Calendar: ${data.error?.message || 'Unknown error'}`);
  }

  const isAvailable = !data.items?.some((event: any) => {
    const eventStart = new Date(event.start.dateTime);
    const eventEnd = new Date(event.end.dateTime);
    return startTime < eventEnd && endTime > eventStart;
  });

  return new Response(
    JSON.stringify({ available: isAvailable }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

async function createEvent(appointment: AppointmentRequest) {
  const startTime = new Date(`${appointment.date}T${appointment.time}`);
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

  const event = {
    summary: `RDV ${appointment.service} - ${appointment.firstName} ${appointment.lastName}`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'Europe/Paris',
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'Europe/Paris',
    },
  };

  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GOOGLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Erreur création événement: ${data.error?.message || 'Unknown error'}`);
  }

  return new Response(
    JSON.stringify({ success: true, event: data }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
