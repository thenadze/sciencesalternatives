
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marie L.",
      text: "Les séances de reiki m'ont apporté une sérénité que je n'avais pas ressentie depuis des années. Un vrai changement dans ma vie quotidienne.",
      stars: 5
    }, 
    {
      name: "Jean P.",
      text: "Le magnétisme a considérablement réduit mes douleurs chroniques. Je suis reconnaissant d'avoir découvert cette approche alternative.",
      stars: 5
    }, 
    {
      name: "Sophie R.",
      text: "Une expérience apaisante et régénératrice. La bienveillance et le professionnalisme du praticien m'ont mise en confiance dès la première séance.",
      stars: 5
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <ScrollObserver>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-cinzel mb-4">
              Témoignages de <span className="text-energy-400">confiance</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Découvrez les expériences de ceux qui ont retrouvé leur équilibre énergétique.
            </p>
          </div>
        </ScrollObserver>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              name={testimonial.name}
              text={testimonial.text}
              stars={testimonial.stars}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
