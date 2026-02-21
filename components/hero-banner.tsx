import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import type { GameMeta } from "@/lib/games/registry";

interface HeroBannerProps {
  game: GameMeta;
}

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOmCoToV9_cdzve8PvBrGeRmbSeZaPy4wiGtwCvhDE1CuCTg69X_4Wi78s1O7TCmlEhuVgoNh7QPYp4-fSG__cM_mqsnmRTGBP29uJgILyRuf80xbENhZOr0ozyd1pzcqjzcRNW7lvOvi4yEWcuoMwcAImG_603KDBl7tlEP1tpW9aeTpXPmNO0jMYLMmcZEAdgoIZpr3uGugTjNiSOZwj3VAO2dqj42XeXeRjUJonHEr8R_e4elDEbRJ5-c124WW7Njv5jqU7FVA";

export default function HeroBanner({ game }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl group">
      {/*
       * Aspect ratio ladder: portrait on phones → landscape on tablets → ultra-wide on desktop.
       * aspect-[21/9] alone gives ~167px on a 390px phone — far too short for the content stack.
       */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] w-full bg-slate-800">
        {/* On mobile the gradient goes bottom-up so the centered text stays readable over the image. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09050d] via-[#09050d]/60 to-[#09050d]/20 md:bg-gradient-to-r md:from-[#09050d] md:via-[#09050d]/40 md:to-transparent z-10" />
        <Image
          src={game.thumbnail ?? HERO_BG}
          alt={game.title}
          fill
          sizes="100vw"
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end sm:justify-center px-5 sm:px-8 md:px-16 pb-6 sm:pb-0 space-y-2 sm:space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Game of the Day
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white leading-tight max-w-2xl drop-shadow-lg">
            {game.title.toUpperCase()}
          </h2>

          {/* Clamp description on small screens so it never displaces the CTAs */}
          <p className="text-slate-300 text-xs sm:text-sm md:text-lg max-w-lg line-clamp-2 sm:line-clamp-none">
            {game.description}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-4 pt-1 sm:pt-2">
            <Link
              href={`/play/${game.slug}`}
              className="bg-primary hover:bg-primary/80 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all shadow-xl shadow-primary/30 hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> Play Now
            </Link>
            {game.videoTrailer ? (
              <Link
                href={game.videoTrailer}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all border border-white/10"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" /> Watch Trailer
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
