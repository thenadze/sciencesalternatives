
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
      return handleAuthorization(req);
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

function handleAuthorization(req) {
  try {
    if (!GOOGLE_CLIENT_ID) {
      throw new Error('Google Client ID non configuré');
    }

    console.log('Génération de l\'URL d\'autorisation avec REDIRECT_URI:', REDIRECT_URI);

    // Récupérer l'origine de la requête pour le paramètre state
    const origin = req.headers.get('origin') || 'https://lovable.dev';
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events');
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent'); // Force l'affichage du consentement pour obtenir un refresh_token
    // Ajouter l'origine dans le state pour rediriger correctement après
    authUrl.searchParams.set('state', origin);

    console.log('URL d\'autorisation générée:', authUrl.toString());

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
    const state = url.searchParams.get('state') || '';

    console.log('Callback reçu avec code et state:', { code: code?.substring(0, 5) + '...', state });

    if (!code) {
      console.error('Code d\'autorisation manquant');
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
    console.log('Tentative d\'échange du code contre des tokens');
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
      console.error('Erreur lors de l\'échange de token:', errorData);
      throw new Error(`Erreur lors de l'échange de token: ${errorData}`);
    }

    const tokens = await tokenResponse.json();
    console.log('Tokens reçus:', { access_token: tokens.access_token?.substring(0, 5) + '...', expires_in: tokens.expires_in });

    // Dans un vrai système, vous stockeriez ces tokens de manière sécurisée
    // Pour cet exemple, on renvoie vers l'application avec un message de succès
    const redirectUrl = new URL(state || url.origin);
    
    // Si l'URL ne contient pas déjà un chemin pour rendez-vous, l'ajouter
    if (!redirectUrl.pathname.includes('/rendez-vous')) {
      redirectUrl.pathname = '/rendez-vous';
    }
    
    redirectUrl.searchParams.set('calendar_connected', 'true');
    console.log('Redirection vers:', redirectUrl.toString());

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
    let redirectUrl;
    try {
      const url = new URL(req.url);
      const state = url.searchParams.get('state') || '';
      redirectUrl = new URL(state || 'https://lovable.dev');
      
      // Si l'URL ne contient pas déjà un chemin pour rendez-vous, l'ajouter
      if (!redirectUrl.pathname.includes('/rendez-vous')) {
        redirectUrl.pathname = '/rendez-vous';
      }
    } catch (e) {
      redirectUrl = new URL('https://lovable.dev/rendez-vous');
    }
    
    redirectUrl.searchParams.set('calendar_error', 'true');
    console.log('Redirection vers (erreur):', redirectUrl.toString());

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
    JSON.stringify({ connected: false, available: true }), 
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
