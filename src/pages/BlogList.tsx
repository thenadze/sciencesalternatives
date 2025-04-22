
import { BlogPostCard } from "./BlogPostCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BlogListProps {
  filteredPosts: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function BlogList({ filteredPosts, searchTerm, setSearchTerm }: BlogListProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-cinzel">
          Articles <span className="text-energy-400">récents</span>
        </h2>
        {searchTerm && (
          <p className="text-gray-400">
            {filteredPosts.length} résultat{filteredPosts.length !== 1 ? 's' : ''} pour "{searchTerm}"
            <Button
              variant="link"
              onClick={() => setSearchTerm('')}
              className="text-energy-400 ml-2"
            >
              Effacer
            </Button>
          </p>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">Aucun article ne correspond à votre recherche</p>
          <Button variant="outline" onClick={() => setSearchTerm('')} className="border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
            Voir tous les articles
          </Button>
        </div>
      ) : (
        filteredPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))
      )}

      <div className="flex justify-center">
        <Button variant="outline" className="border-energy-400/50 text-energy-400 hover:bg-energy-400/10">
          Voir plus d'articles
        </Button>
      </div>
    </div>
  );
}
