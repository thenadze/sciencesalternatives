
import { Link } from "react-router-dom";
import { ArrowRight, PlusCircle } from "lucide-react";
import { EnergyButton } from "@/components/ui/energy-button";
import { AppointmentCard } from "./AppointmentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Appointment = {
  id: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
};

type AppointmentListProps = {
  isLoaded: boolean;
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  onCancelAppointment: (id: string) => void;
};

export const AppointmentList = ({ 
  isLoaded, 
  upcomingAppointments, 
  pastAppointments, 
  onCancelAppointment 
}: AppointmentListProps) => {
  return (
    <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg border border-mystic-800/30 overflow-hidden">
      <div className="p-6 flex justify-between items-center">
        <h3 className="text-xl font-cinzel">Vos rendez-vous</h3>
        <EnergyButton asChild size="sm">
          <Link to="/rendez-vous">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau rendez-vous
          </Link>
        </EnergyButton>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <div className="px-6 border-b border-mystic-800/30">
          <TabsList className="bg-transparent border-b-0 mb-0 justify-start">
            <TabsTrigger value="upcoming" className="bg-transparent data-[state=active]:bg-mystic-800/40">
              À venir ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="bg-transparent data-[state=active]:bg-mystic-800/40">
              Historique ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="upcoming" className="mt-0 p-0">
          <div className="divide-y divide-mystic-800/30">
            {isLoaded ? (
              upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    onCancelAppointment={onCancelAppointment}
                  />
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-400 mb-4">Vous n'avez pas de rendez-vous à venir.</p>
                  <EnergyButton asChild>
                    <Link to="/rendez-vous">
                      Prendre rendez-vous
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </EnergyButton>
                </div>
              )
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-400">Chargement de vos rendez-vous...</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-0 p-0">
          <div className="divide-y divide-mystic-800/30">
            {isLoaded ? (
              pastAppointments.length > 0 ? (
                pastAppointments.map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    isPast={true}
                  />
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-400">Vous n'avez pas d'historique de rendez-vous.</p>
                </div>
              )
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-400">Chargement de vos rendez-vous...</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
