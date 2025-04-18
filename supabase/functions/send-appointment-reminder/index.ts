
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": 
    "authorization, x-client-info, apikey, content-type",
};

interface Appointment {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { appointment, hoursUntilAppointment }: { 
      appointment: Appointment, 
      hoursUntilAppointment: number 
    } = await req.json();

    if (!resend) {
      console.log("RESEND_API_KEY non configurée, simulation d'un envoi réussi");
      return new Response(
        JSON.stringify({ 
          success: true,
          simulated: true,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Format the email content based on how many hours until the appointment
    const reminderType = hoursUntilAppointment === 24 ? "demain" : "dans 2 heures";
    
    const emailResponse = await resend.emails.send({
      from: "Harmonie Énergétique <onboarding@resend.dev>",
      to: [appointment.email],
      subject: `Rappel : Votre rendez-vous ${reminderType}`,
      html: `
        <h1>Rappel de votre rendez-vous</h1>
        <p>Bonjour ${appointment.first_name},</p>
        <p>Nous vous rappelons votre rendez-vous ${reminderType} :</p>
        <ul>
          <li>Service : ${appointment.service}</li>
          <li>Date : ${appointment.appointment_date}</li>
          <li>Heure : ${appointment.appointment_time}</li>
        </ul>
        <p>En cas d'empêchement, merci de nous contacter au plus tôt.</p>
        <p>À bientôt !<br>L'équipe d'Harmonie Énergétique</p>
      `,
    });

    console.log("Email de rappel envoyé avec succès:", emailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Erreur dans la fonction send-appointment-reminder:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
