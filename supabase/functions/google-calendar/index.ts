
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');
const REDIRECT_URI = 'https://xrugepqsqfftnxhahfkp.supabase.co/functions/v1/google-calendar/callback';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname;

  switch (path) {
    case '/google-calendar/authorize':
      return handleAuthorization();
    case '/google-calendar/callback':
      return handleCallback(req);
    case '/google-calendar/check':
      return checkAvailability(req);
    case '/google-calendar/create':
      return createEvent(req);
    default:
      return new Response('Not Found', { status: 404 });
  }
});

function handleAuthorization() {
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/calendar.events');
  authUrl.searchParams.set('access_type', 'offline');

  return new Response(null, {
    status: 302,
    headers: {
      'Location': authUrl.toString(),
      ...corsHeaders
    }
  });
}

async function handleCallback(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('No authorization code found', { status: 400 });
  }

  // Exchange authorization code for tokens
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI
    })
  });

  const tokens = await tokenResponse.json();

  // Here you would typically store the tokens securely for the user
  // For now, we'll just return them (in a production app, store in a secure database)
  return new Response(JSON.stringify(tokens), {
    headers: { 
      ...corsHeaders, 
      'Content-Type': 'application/json' 
    }
  });
}

async function checkAvailability(req) {
  // Implement Google Calendar availability check logic
  // This would use the stored access token to query the user's calendar
  return new Response(JSON.stringify({ available: true }), {
    headers: { 
      ...corsHeaders, 
      'Content-Type': 'application/json' 
    }
  });
}

async function createEvent(req) {
  // Implement Google Calendar event creation logic
  // This would use the stored access token to create an event
  return new Response(JSON.stringify({ success: true }), {
    headers: { 
      ...corsHeaders, 
      'Content-Type': 'application/json' 
    }
  });
}
