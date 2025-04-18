
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const handler = async (_req: Request) => {
  try {
    // Get current time in UTC
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Fetch appointments for today and tomorrow
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_date', today);

    if (error) throw error;

    for (const appointment of appointments) {
      // Calculate hours until appointment
      const appointmentDateTime = new Date(
        `${appointment.appointment_date}T${appointment.appointment_time}`
      );
      const hoursUntil = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

      // Send notifications at 24 hours and 2 hours before
      if (Math.abs(hoursUntil - 24) < 0.5 || Math.abs(hoursUntil - 2) < 0.5) {
        try {
          const response = await fetch(
            `${SUPABASE_URL}/functions/v1/send-appointment-reminder`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                appointment,
                hoursUntilAppointment: Math.round(hoursUntil),
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to send reminder: ${response.statusText}`);
          }

          console.log(`Reminder sent for appointment ${appointment.id}`);
        } catch (sendError) {
          console.error(`Error sending reminder for appointment ${appointment.id}:`, sendError);
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in check-upcoming-appointments:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
