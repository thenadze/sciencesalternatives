
import { ScrollObserver } from "@/components/ui/scroll-observer";

export const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,190,89,0.1),transparent_60%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <ScrollObserver>
          <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
            À propos de <span className="text-energy-400">votre praticien</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Un parcours dédié à l'harmonie énergétique et au bien-être des personnes
          </p>
        </ScrollObserver>
      </div>
    </section>
  );
};
