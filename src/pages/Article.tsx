
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const article = {
  title: "Les bienfaits du Reiki sur l'anxiété et le stress",
  date: "12 avril 2025",
  readTime: "5 min",
  author: "Marie Fournier",
  image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
  content: [
    "Le Reiki est une méthode énergétique japonaise qui vise à rétablir l’équilibre naturel du corps, du mental et de l’esprit. Bien qu’il soit utilisé pour accompagner différents maux, l’un de ses bienfaits majeurs est la gestion de l’anxiété et du stress.",
    "Durant une séance de Reiki, le praticien canalise l’énergie universelle par l’imposition des mains. Cette énergie permet de dissoudre les tensions et d’aider la personne à retrouver un état de profonde détente.",
    "Les effets les plus couramment observés sont :",
    "- Diminue les tensions nerveuses et émotionnelles",
    "- Améliore la qualité du sommeil",
    "- Favorise une meilleure respiration et une sensation d’apaisement",
    "- Redonne un sentiment de sécurité intérieure et de confiance en soi",
    "Après quelques séances, beaucoup de personnes rapportent un sentiment de légèreté mentale, moins de fatigue, une meilleure clarté d’esprit et surtout une capacité à mieux gérer les pics de stress du quotidien.",
    "Le Reiki ne se substitue pas à un avis médical mais constitue un formidable allié pour cultiver le bien-être intérieur, prévenir l’épuisement et avancer plus sereinement face aux défis de la vie.",
    "Vous souhaitez expérimenter ses bienfaits ? Prenez rendez-vous dès maintenant !",
  ]
};

export default function Article() {
  return (
    <div className="overflow-hidden">
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <img 
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-8 shadow-md"
            />
            <div className="flex items-center text-gray-400 text-sm mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">{article.date}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span className="mr-4">{article.readTime}</span>
              <User className="h-4 w-4 mr-1" />
              <span>{article.author}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-cinzel mb-6 text-energy-400">
              {article.title}
            </h1>
            <div className="prose prose-invert text-gray-300 space-y-6 mb-8 max-w-none">
              {article.content.map((paragraph, idx) =>
                paragraph.startsWith("-") ? (
                  <li key={idx} className="ml-5 list-disc">{paragraph.replace("-", "").trim()}</li>
                ) : (
                  <p key={idx}>{paragraph}</p>
                )
              )}
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center text-energy-400 hover:text-energy-300 transition-colors"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Retour au blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
