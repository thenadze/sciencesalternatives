
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Heart, Search, User } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Les bienfaits du Reiki sur l'anxiété et le stress",
      excerpt: "Découvrez comment les séances de Reiki peuvent aider à réduire l'anxiété et à gérer le stress quotidien grâce à l'équilibrage des centres énergétiques.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
      date: "12 avril 2025",
      readTime: "5 min",
      author: "Marie Fournier",
      category: "Reiki"
    },
    {
      id: 2,
      title: "Comprendre le magnétisme : science et tradition",
      excerpt: "Un voyage à travers l'histoire du magnétisme, de ses racines traditionnelles à la compréhension scientifique moderne des champs énergétiques.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80",
      date: "28 mars 2025",
      readTime: "7 min",
      author: "Jean Dupont",
      category: "Magnétisme"
    },
    {
      id: 3,
      title: "Méditation et énergies subtiles : un guide pour débutants",
      excerpt: "Apprenez à percevoir et à travailler avec les énergies subtiles grâce à des techniques de méditation simples et accessibles aux débutants.",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80",
      date: "15 mars 2025",
      readTime: "6 min",
      author: "Sophie Martin",
      category: "Méditation"
    },
    {
      id: 4,
      title: "Comment préparer votre espace pour une pratique énergétique",
      excerpt: "Conseils pratiques pour créer un environnement propice aux soins énergétiques, que ce soit pour votre pratique personnelle ou pour recevoir des soins.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80",
      date: "2 mars 2025",
      readTime: "4 min",
      author: "Marie Fournier",
      category: "Conseils"
    },
    {
      id: 5,
      title: "L'énergie des cristaux : comment les utiliser en complément des soins",
      excerpt: "Explorez les propriétés énergétiques des cristaux et apprenez à les intégrer dans votre routine de soins pour amplifier les bienfaits.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80",
      date: "18 février 2025",
      readTime: "8 min",
      author: "Jean Dupont",
      category: "Cristaux"
    },
  ];

  const categories = [
    "Reiki", "Magnétisme", "Méditation", "Chakras", "Cristaux", "Conseils", "Témoignages"
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,190,89,0.1),transparent_70%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <ScrollObserver>
            <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
              Blog & <span className="text-energy-400">Conseils</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
              Découvrez nos articles sur les thérapies énergétiques et le bien-être
            </p>
            <div className="max-w-md mx-auto relative">
              <Input 
                type="search" 
                placeholder="Rechercher un article..." 
                className="bg-mystic-800/40 border-mystic-700/50 pl-10 py-6" 
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </ScrollObserver>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-10">
              <ScrollObserver>
                <h2 className="text-2xl font-cinzel mb-6">
                  Articles <span className="text-energy-400">récents</span>
                </h2>
              </ScrollObserver>

              {blogPosts.map((post) => (
                <ScrollObserver key={post.id}>
                  <article className="bg-mystic-900/40 backdrop-blur-sm rounded-lg overflow-hidden border border-mystic-800/30 hover:border-energy-400/30 transition-colors duration-300">
                    <div className="aspect-[16/9] relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-mystic-950 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-energy-400/90 text-mystic-950 px-3 py-1 text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{post.date}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="mr-4">{post.readTime}</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <h3 className="text-xl font-cinzel mb-3">
                        <Link to={`/blog/${post.id}`} className="hover:text-energy-400 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-400 mb-4">{post.excerpt}</p>
                      <Link to={`/blog/${post.id}`} className="inline-flex items-center text-energy-400 hover:text-energy-300 transition-colors">
                        Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </ScrollObserver>
              ))}

              <ScrollObserver>
                <div className="flex justify-center">
                  <Button variant="outline" className="border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
                    Voir plus d'articles
                  </Button>
                </div>
              </ScrollObserver>
            </div>

            {/* Sidebar */}
            <div className="md:mt-14">
              <div className="sticky top-24 space-y-8">
                <ScrollObserver>
                  <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                    <h3 className="text-xl font-cinzel mb-4">Catégories</h3>
                    <ul className="space-y-2">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <Link 
                            to={`/blog/category/${category.toLowerCase()}`} 
                            className="flex items-center text-gray-400 hover:text-energy-400 transition-colors py-1"
                          >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            {category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollObserver>

                <ScrollObserver>
                  <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
                    <h3 className="text-xl font-cinzel mb-4">Newsletter</h3>
                    <p className="text-gray-400 mb-4">
                      Inscrivez-vous pour recevoir nos derniers articles et conseils en bien-être énergétique.
                    </p>
                    <div className="space-y-3">
                      <Input 
                        type="email" 
                        placeholder="Votre email" 
                        className="bg-mystic-800/40 border-mystic-700/50" 
                      />
                      <Button className="w-full bg-energy-400 hover:bg-energy-500 text-mystic-950">
                        S'inscrire
                      </Button>
                    </div>
                  </div>
                </ScrollObserver>

                <ScrollObserver>
                  <div className="bg-gradient-to-br from-mystic-900 to-mystic-800 rounded-lg p-6 border border-mystic-700/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-400 to-soft-600"></div>
                    <div className="relative z-10">
                      <div className="flex justify-center mb-4">
                        <Heart className="h-12 w-12 text-energy-400" />
                      </div>
                      <h3 className="text-xl font-cinzel mb-3 text-center">Besoin d'un soin personnalisé ?</h3>
                      <p className="text-gray-400 mb-4 text-center">
                        Prenez rendez-vous pour une consultation et découvrez nos soins énergétiques.
                      </p>
                      <Button asChild className="w-full bg-energy-400 hover:bg-energy-500 text-mystic-950">
                        <Link to="/rendez-vous">
                          Prendre rendez-vous
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollObserver>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
