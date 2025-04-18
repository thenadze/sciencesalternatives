
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": 
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get current time in UTC
    const now = new Date();
    
    // Format date to YYYY-MM-DD
    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };
    
    const today = formatDate(now);
    
    // Add one day to get tomorrow's date
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = formatDate(tomorrow);
    
    console.log(`Checking appointments for ${today} and ${tomorrowFormatted}`);

    // Fetch appointments for today and tomorrow
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .or(`appointment_date.eq.${today},appointment_date.eq.${tomorrowFormatted}`)
      .eq('status', 'pending'); // Only get pending appointments, not cancelled ones

    if (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }

    console.log(`Found ${appointments?.length || 0} upcoming appointments`);

    for (const appointment of appointments) {
      // Calculate hours until appointment
      const appointmentDateTime = new Date(
        `${appointment.appointment_date}T${appointment.appointment_time}:00`
      );
      const hoursUntil = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

      console.log(`Appointment ID ${appointment.id}: ${Math.round(hoursUntil)} hours until appointment`);

      // Send notifications at 24 hours and 2 hours before
      if (Math.abs(hoursUntil - 24) < 0.5 || Math.abs(hoursUntil - 2) < 0.5) {
        try {
          console.log(`Sending reminder for appointment ID ${appointment.id}`);
          
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
                hoursUntilAppointment: Math.abs(hoursUntil - 24) < 0.5 ? 24 : 2,
              }),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to send reminder: ${response.statusText} - ${errorText}`);
          }

          console.log(`Reminder sent for appointment ${appointment.id}`);
        } catch (sendError) {
          console.error(`Error sending reminder for appointment ${appointment.id}:`, sendError);
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Checked ${appointments?.length || 0} appointments` 
    }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });
  } catch (error) {
    console.error("Error in check-upcoming-appointments:", error);
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
