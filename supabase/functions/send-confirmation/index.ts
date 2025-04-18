
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Création de l'instance Resend avec la clé API
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

// En-têtes CORS pour permettre les requêtes depuis n'importe quelle origine
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": 
    "authorization, x-client-info, apikey, content-type",
};

// Interface pour la requête d'email de bienvenue
interface WelcomeEmailRequest {
  firstName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Gestion des requêtes préliminaires CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Vérification de la clé API
    if (!resendApiKey) {
      console.error("RESEND_API_KEY n'est pas configurée");
      return new Response(
        JSON.stringify({ error: "Configuration du service d'email manquante" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Extraction des données de la requête
    const { firstName, email }: WelcomeEmailRequest = await req.json();
    
    if (!firstName || !email) {
      return new Response(
        JSON.stringify({ error: "Le prénom et l'email sont requis" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Tentative d'envoi d'email à ${email} pour ${firstName}`);

    // Envoi de l'email via Resend
    const emailResponse = await resend.emails.send({
      from: "Lovable <onboarding@resend.dev>",
      to: [email],
      subject: "Bienvenue sur notre plateforme !",
      html: `
        <h1>Bienvenue ${firstName} !</h1>
        <p>Merci de vous être inscrit sur notre plateforme.</p>
        <p>Nous sommes ravis de vous compter parmi nos membres et nous espérons que vous apprécierez nos services.</p>
        <p>N'hésitez pas à nous contacter si vous avez des questions.</p>
        <p>À bientôt !<br>L'équipe</p>
      `,
    });

    console.log("Email envoyé avec succès:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erreur dans la fonction send-confirmation:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
