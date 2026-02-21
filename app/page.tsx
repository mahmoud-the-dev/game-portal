import { getAllGames } from "@/lib/games/registry";
import HeroBanner from "@/components/hero-banner";
import CategoryFilter from "@/components/category-filter";
import GameCard from "@/components/game-card";
import { Flame, ChevronRight } from "lucide-react";

const CATEGORIES = [
  "All Games",
  "Action",
  "RPG",
  "Shooters",
  "Racing",
  "Strategy",
  "Indie",
  "Horror",
];

export default function Home() {
  const games = getAllGames();
  const featured = games.find((g) => g.badge) ?? games[0];

  return (
    <div className="p-4 lg:p-8 space-y-10">
      <HeroBanner game={featured} />

      <CategoryFilter categories={CATEGORIES} />

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-extrabold flex items-center gap-3">
            <Flame className="w-6 h-6 text-primary" />
            Recommended for You
          </h2>
          <a
            href="#"
            className="text-primary font-semibold hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center py-10 space-y-4">
        <button className="px-12 py-3 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-bold transition-all">
          Load More Games
        </button>
        <p className="text-xs text-slate-500 font-medium">
          Showing {games.length} of 2,456 total games
        </p>
      </section>
    </div>
  );
}
