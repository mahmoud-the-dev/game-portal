import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { GameMeta } from "@/lib/games/registry";
import TagBadge from "@/components/tag-badge";
import StarRating from "@/components/star-rating";

interface GameCardProps {
  game: GameMeta;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/play/${game.slug}`} className="group cursor-pointer block">
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/5 mb-4 shadow-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-primary/20 group-hover:border-primary/30">
        {game.thumbnail ? (
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-primary/10" />
        )}

        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white text-primary w-14 h-14 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 fill-current" />
          </div>
        </div>

        {game.badge ? (
          <div className="absolute top-3 right-3 px-2 py-1 bg-primary rounded-lg text-xs font-bold text-white uppercase tracking-tighter shadow-lg shadow-primary/40">
            {game.badge}
          </div>
        ) : null}
      </div>

      <div className="px-1 space-y-2">
        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
          {game.title}
        </h3>

        {game.tags && game.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        ) : null}

        {(game.playCount || game.rating != null) ? (
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
            {game.playCount ? <span>{game.playCount}</span> : <span />}
            {game.rating != null ? <StarRating rating={game.rating} /> : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
