
import { z } from "zod";

export const appointmentSchema = z.object({
  service: z.string().min(1, "Veuillez sélectionner un service"),
  appointment_date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  appointment_time: z.string().min(1, "Veuillez sélectionner un horaire"),
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Veuillez entrer un email valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  message: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
