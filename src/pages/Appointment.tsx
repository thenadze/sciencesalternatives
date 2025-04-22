import { ScrollObserver } from "@/components/ui/scroll-observer";
import { AppointmentFAQ } from "@/components/appointment/FAQ";
import { GoogleCalendarButton } from "@/components/appointment/GoogleCalendarButton";

const Appointment = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,190,89,0.1),transparent_60%)]"></div>
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <ScrollObserver>
            <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
              Prendre <span className="text-energy-400">rendez-vous</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
              Réservez votre séance de soins énergétiques directement via Google Calendar en 1 clic !
            </p>
          </ScrollObserver>
        </div>
      </section>

      {/* Google Calendar Button uniquement */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollObserver>
            <div className="max-w-xl mx-auto green-energy-card text-center overflow-visible">
              <h2 className="text-2xl font-cinzel mb-8 relative z-10">
                Planifiez votre <span className="text-energy-400">séance</span>
              </h2>
              <p className="text-gray-300 mb-6 relative z-10">
                Cliquez sur le bouton ci-dessous pour réserver le créneau qui vous convient.<br />
                Toutes les informations (nom, email, date, horaire...) seront saisies directement depuis l'interface Google Calendar.
              </p>
              <div className="relative z-10">
                <GoogleCalendarButton />
              </div>
            </div>
          </ScrollObserver>
        </div>
      </section>

      {/* FAQ */}
      <AppointmentFAQ />
    </div>
  );
};

export default Appointment;
