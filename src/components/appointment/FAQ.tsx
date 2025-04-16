
import { ScrollObserver } from "@/components/ui/scroll-observer";

type FAQItemProps = {
  title: string;
  content: string;
};

const FAQItem = ({ title, content }: FAQItemProps) => (
  <ScrollObserver>
    <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
      <h3 className="text-lg font-cinzel mb-3 text-energy-400">{title}</h3>
      <p className="text-gray-400">{content}</p>
    </div>
  </ScrollObserver>
);

export const AppointmentFAQ = () => {
  const faqItems = [
    {
      title: "Que dois-je porter ?",
      content: "Des vêtements confortables et amples. Les soins se pratiquent habillé, mais il est préférable d'éviter les tissus synthétiques."
    },
    {
      title: "Comment me préparer ?",
      content: "Évitez les repas lourds et l'alcool avant la séance. Si possible, prévoyez un moment de calme après la séance pour intégrer les bienfaits."
    },
    {
      title: "Politique d'annulation",
      content: "Toute annulation doit être faite au moins 24h à l'avance. Passé ce délai, la séance sera facturée à 50%."
    },
    {
      title: "Moyens de paiement",
      content: "Nous acceptons les paiements par carte bancaire, espèces ou virement bancaire. Le règlement s'effectue à la fin de la séance."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <ScrollObserver>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-cinzel mb-4">
              Questions <span className="text-energy-400">fréquentes</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tout ce que vous devez savoir avant votre rendez-vous
            </p>
          </div>
        </ScrollObserver>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((item, index) => (
            <FAQItem key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
    </section>
  );
};
