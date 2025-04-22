
import { useState } from "react";
import { blogPosts } from "./BlogData";

export function useBlogFilter() {
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

  return {
    searchTerm,
    setSearchTerm,
    isSearchOpen,
    setIsSearchOpen,
    filteredPosts
  };
}
