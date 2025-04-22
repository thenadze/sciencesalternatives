
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

interface BlogPostCardProps {
  post: any;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
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
          <Link to={post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`} className="hover:text-energy-400 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-400 mb-4">{post.excerpt}</p>
        <Link
          to={post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`}
          className="inline-flex items-center text-energy-400 hover:text-energy-300 transition-colors"
        >
          Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
