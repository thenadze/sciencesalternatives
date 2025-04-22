
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import { Search } from "lucide-react";

interface BlogHeroProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  filteredPosts: any[];
}

export function BlogHero({ searchTerm, setSearchTerm, isSearchOpen, setIsSearchOpen, filteredPosts }: BlogHeroProps) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-mystic-950 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,190,89,0.1),transparent_70%)]"></div>
      </div>
      <div className="container relative z-10 mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-cinzel mb-6 text-white text-center leading-tight">
          Blog & <span className="text-energy-400">Conseils</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
          Découvrez nos articles sur les thérapies énergétiques et le bien-être
        </p>
        <div className="max-w-md mx-auto relative">
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Rechercher un article..."
                  className="bg-mystic-800/40 border-mystic-700/50 pl-10 py-6"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onClick={() => setIsSearchOpen(true)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </PopoverTrigger>
            {searchTerm.length > 0 && (
              <PopoverContent className="p-0 w-[300px] md:w-[400px]" align="center">
                <Command>
                  <CommandList>
                    <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
                    <CommandGroup heading="Articles">
                      {filteredPosts.map((post) => (
                        <CommandItem key={post.id} onSelect={() => {
                          window.location.href = post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`;
                          setIsSearchOpen(false);
                        }}>
                          <div className="flex items-center">
                            <div className="w-8 h-8 mr-2 overflow-hidden rounded">
                              <img src={post.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{post.title}</p>
                              <p className="text-xs text-gray-500">{post.category}</p>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            )}
          </Popover>
        </div>
      </div>
    </section>
  );
}
