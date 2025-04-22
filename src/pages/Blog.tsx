
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { BlogHero } from "./BlogHero";
import { BlogSidebar } from "./BlogSidebar";
import { BlogList } from "./BlogList";
import { categories } from "./BlogData";
import { useBlogFilter } from "./useBlogFilter";

const Blog = () => {
  const {
    searchTerm,
    setSearchTerm,
    isSearchOpen,
    setIsSearchOpen,
    filteredPosts
  } = useBlogFilter();

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
                <BlogList
                  filteredPosts={filteredPosts}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
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
