"use client";

import { useRef } from "react";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import GameCard from "@/components/game-card";
import type { GameMeta } from "@/lib/games/registry";

interface PlayNextRowProps {
  games: GameMeta[];
}

const SCROLL_AMOUNT = 300;

/** Horizontal discovery row shown below the game player. */
export default function PlayNextRow({ games }: PlayNextRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (games.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-extrabold flex items-center gap-3">
          <Flame className="w-6 h-6 text-primary" />
          Play Next
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-2 rounded-full border border-primary/20 text-slate-400 hover:text-primary hover:border-primary/60 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-2 rounded-full border border-primary/20 text-slate-400 hover:text-primary hover:border-primary/60 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x"
      >
        {games.map((g) => (
          <div key={g.slug} className="min-w-[260px] max-w-[300px] snap-start shrink-0">
            <GameCard game={g} />
          </div>
        ))}
      </div>
    </section>
  );
}
