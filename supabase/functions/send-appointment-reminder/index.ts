
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
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

const formatServiceName = (service: string): string => {
  switch(service) {
    case 'reiki': return "Reiki";
    case 'magnetisme': return "Magnétisme";
    case 'combined': return "Soins combinés";
    default: return service;
  }
};

const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { appointment, hoursUntilAppointment }: { 
      appointment: Appointment, 
      hoursUntilAppointment: number 
    } = await req.json();

    console.log(`Processing reminder for ${appointment.first_name} ${appointment.last_name}, ${hoursUntilAppointment}h before appointment`);

    if (!resend) {
      console.log("RESEND_API_KEY not configured, simulating a successful send");
      return new Response(
        JSON.stringify({ 
          success: true,
          simulated: true,
          appointment: appointment.id,
          hours: hoursUntilAppointment
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Format the email content based on how many hours until the appointment
    const reminderType = hoursUntilAppointment === 24 ? "demain" : "dans 2 heures";
    const serviceName = formatServiceName(appointment.service);
    const formattedDate = formatDate(appointment.appointment_date);
    
    const emailResponse = await resend.emails.send({
      from: "Harmonie Énergétique <onboarding@resend.dev>",
      to: [appointment.email],
      subject: `Rappel : Votre rendez-vous ${reminderType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #9a7b4f; border-bottom: 1px solid #eee; padding-bottom: 10px;">Rappel de votre rendez-vous</h1>
          <p>Bonjour ${appointment.first_name},</p>
          <p>Nous vous rappelons votre rendez-vous ${reminderType} :</p>
          <div style="background-color: #f9f5ed; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Service :</strong> ${serviceName}</p>
            <p><strong>Date :</strong> ${formattedDate}</p>
            <p><strong>Heure :</strong> ${appointment.appointment_time}</p>
          </div>
          <p>En cas d'empêchement, merci de nous contacter au plus tôt.</p>
          <p>À bientôt !<br>L'équipe d'Harmonie Énergétique</p>
        </div>
      `,
    });

    console.log("Email reminder sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        email: emailResponse,
        appointment: appointment.id,
        hours: hoursUntilAppointment
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-appointment-reminder function:", error);
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
