
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import * as XLSX from "https://esm.sh/xlsx@0.18.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = "https://xrugepqsqfftnxhahfkp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhydWdlcHFzcWZmdG54aGFoZmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzMxMjQsImV4cCI6MjA2MDQwOTEyNH0.uiTGCD-ajWRzbXupPRssetq_g9Y54dTEgjCC-EYDKPI";

serve(async (req) => {
  // Gestion des requêtes OPTIONS pour CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Vérification de la méthode
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Méthode non autorisée" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Récupération du token JWT depuis les headers
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Non autorisé: Token manquant" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Initialisation du client Supabase avec le token de l'utilisateur
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // Vérification de l'utilisateur
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Non autorisé: Token invalide" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Utilisateur authentifié:", user.email);

    // Récupération de tous les utilisateurs (emails)
    const { data: users, error: fetchError } = await supabase
      .from('auth.users')
      .select('email');

    if (fetchError) {
      console.error("Erreur lors de la récupération des emails:", fetchError);
      
      // Tentative alternative: récupérer les emails depuis les rendez-vous
      const { data: appointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('email')
        .distinct();

      if (appointmentsError) {
        return new Response(
          JSON.stringify({ error: "Erreur lors de la récupération des données" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("Emails récupérés depuis la table appointments:", appointments);
      
      // Génération du fichier Excel
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(appointments);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Emails");
      
      // Conversion en buffer
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: excelBuffer,
          source: "appointments",
          count: appointments.length 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Emails récupérés:", users);
    
    // Génération du fichier Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Emails");
    
    // Conversion en buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: excelBuffer,
        source: "users",
        count: users.length 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Erreur serveur:", error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur interne" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
