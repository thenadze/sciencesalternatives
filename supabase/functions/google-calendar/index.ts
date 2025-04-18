
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

  try {
    const url = new URL(req.url);
    const path = url.pathname;

    // Extraire l'action de l'URL ou du corps de la requête
    let action = '';
    if (path === '/google-calendar') {
      // Si l'action est dans le corps de la requête
      const requestData = await req.json().catch(() => ({}));
      action = requestData.action || '';

      switch (action) {
        case 'check':
          return checkConnection(req);
        case 'create':
          return createEvent(req);
        default:
          return new Response(
            JSON.stringify({ error: 'Action non valide' }), 
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
      }
    } else if (path === '/google-calendar/authorize') {
      return handleAuthorization();
    } else if (path === '/google-calendar/callback') {
      return handleCallback(req);
    } else {
      return new Response(
        JSON.stringify({ error: 'Chemin non valide' }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
  } catch (error) {
    console.error('Erreur serveur:', error.message);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur interne', message: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function handleAuthorization() {
  try {
    if (!GOOGLE_CLIENT_ID) {
      throw new Error('Google Client ID non configuré');
    }

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/calendar.events');
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent'); // Force l'affichage du consentement pour obtenir un refresh_token

    return new Response(
      JSON.stringify({ url: authUrl.toString() }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Erreur d\'autorisation:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création de l\'URL d\'autorisation', message: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

async function handleCallback(req) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Code d\'autorisation manquant' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      throw new Error('Identifiants Google non configurés');
    }

    // Échange du code d'autorisation contre des tokens
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

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      throw new Error(`Erreur lors de l'échange de token: ${errorData}`);
    }

    const tokens = await tokenResponse.json();

    // Dans un vrai système, vous stockeriez ces tokens de manière sécurisée
    // Pour cet exemple, on renvoie vers l'application avec un message de succès
    const redirectUrl = new URL(url.origin);
    redirectUrl.pathname = '/rendez-vous';
    redirectUrl.searchParams.set('calendar_connected', 'true');

    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': redirectUrl.toString()
      }
    });
  } catch (error) {
    console.error('Erreur callback:', error);
    // Redirect to the appointment page with an error message
    const redirectUrl = new URL(req.headers.get('origin') || 'https://example.com');
    redirectUrl.pathname = '/rendez-vous';
    redirectUrl.searchParams.set('calendar_error', 'true');

    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': redirectUrl.toString()
      }
    });
  }
}

async function checkConnection(req) {
  // Pour l'instant, simulons une vérification simple
  // Dans une implémentation réelle, vous vérifieriez les tokens stockés
  return new Response(
    JSON.stringify({ connected: false }), 
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

async function createEvent(req) {
  try {
    const requestData = await req.json();
    const { date, time, service, firstName, lastName } = requestData;

    // Dans une implémentation réelle, vous utiliseriez le token d'accès stocké
    // pour créer un événement dans Google Calendar

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Événement simulé créé avec succès" 
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Erreur lors de la création de l\'événement',
        message: error.message 
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
}
