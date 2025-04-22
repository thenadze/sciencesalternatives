
import { useState } from "react";
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { BlogHero } from "./BlogHero";
import { BlogSidebar } from "./BlogSidebar";
import { BlogList } from "./BlogList";

const blogPosts = [
  {
    id: 1,
    title: "Les bienfaits du Reiki sur l'anxiété et le stress",
    excerpt: "Découvrez comment les séances de Reiki peuvent aider à réduire l'anxiété et à gérer le stress quotidien grâce à l'équilibrage des centres énergétiques.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
    date: "12 avril 2025",
    readTime: "5 min",
    author: "Marie Fournier",
    category: "Reiki",
    slug: "bienfaits-reiki",
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredPosts = searchTerm 
    ? blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : blogPosts;

  return (
    <div className="overflow-hidden">
      <BlogHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        filteredPosts={filteredPosts}
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ScrollObserver>
                <BlogList filteredPosts={filteredPosts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </ScrollObserver>
            </div>
            <div className="md:mt-14">
              <BlogSidebar categories={categories} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
