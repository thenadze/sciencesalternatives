
import { ScrollObserver } from "@/components/ui/scroll-observer";

interface QualificationProps {
  year: string;
  title: string;
  institution: string;
  index: number;
}

export const QualificationCard = ({
  year,
  title,
  institution,
  index,
}: QualificationProps) => {
  return (
    <ScrollObserver>
      <div
        className={
          [
            "relative flex md:flex-row",
            index % 2 === 0 ? "md:flex-row-reverse" : "",
            // Centrage & largeur pour mobile uniquement
            "flex-col md:items-stretch items-center",
          ].join(" ")
        }
      >
        <div
          className={[
            // Centrage automatique en mobile
            "w-full",
            "md:w-1/2",
            "flex",
            "justify-center",
            "md:px-10",
            // Mobile : centrage horizontal, largeur max, text-align
            "md:mx-0 mx-auto",
          ].join(" ")}
          style={{
            // maxWidth: "90%" appliqué sur mobile,
            maxWidth: "90%",
          }}
        >
          <div
            className={[
              // Bloc principal
              "bg-mystic-900/60",
              "backdrop-blur-sm",
              "p-6",
              "rounded-lg",
              "border",
              "border-mystic-800/50",
              "md:w-[90%]",
              "text-center",
              // Ombre en mobile
              "shadow-none md:shadow-none timeline-mobile-shadow",
              "fade-in-timeline-card"
            ].join(" ")}
            style={{
              // Pour que text-align fonctionne aussi avec tailwind
              textAlign: "center",
            }}
          >
            <div className="font-cinzel text-energy-400 text-lg mb-1">{title}</div>
            <div className="text-gray-400 mb-1">{institution}</div>
            <div className="text-gray-500 text-sm">{year}</div>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-mystic-950 border-2 border-energy-400"></div>
        </div>
      </div>
    </ScrollObserver>
  );
};
