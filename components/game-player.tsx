"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Play, Maximize, Minimize } from "lucide-react";
import type { GameMeta } from "@/lib/games/registry";
import GameIframe from "@/components/game-iframe";
import StarRating from "@/components/star-rating";

interface GamePlayerProps {
  game: GameMeta;
}

/**
 * Combined game stage + toolbar.
 *
 * State managed here:
 *  - `started`    — flips from pre-game overlay to the sandboxed iframe
 *  - `fullscreen` — mirrors the Fullscreen API state on the stage container
 */
export default function GamePlayer({ game }: GamePlayerProps) {
  const [started, setStarted] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchError, setLaunchError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const startGame = useCallback(async () => {
    if (started || isLaunching) return;

    setLaunchError(null);
    setIsLaunching(true);

    try {
      // Validate the static game entrypoint before mounting the iframe.
      const response = await fetch(`/games/${game.slug}/index.html`, {
        method: "HEAD",
        cache: "no-store",
      });

      if (response.ok) {
        setStarted(true);
        return;
      }

      setLaunchError(
        "This game is not available at the moment. Please check back later.",
      );
    } catch {
      setLaunchError(
        "This game is not available at the moment. Please check back later.",
      );
    } finally {
      setIsLaunching(false);
    }
  }, [game.slug, isLaunching, started]);

  const toggleFullscreen = useCallback(async () => {
    if (!stageRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await stageRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      /* Fullscreen may be blocked by browser policy — fail silently */
    }
  }, []);

  // Sync state when user exits fullscreen via Escape key
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div className="space-y-4">
      {/* ── Stage ── */}
      <section className="relative group" ref={stageRef}>
        <div
          className={`relative w-full overflow-hidden bg-black shadow-2xl shadow-primary/10 border border-primary/10 ${
            isFullscreen
              ? "rounded-none h-screen"
              : "rounded-xl lg:rounded-2xl aspect-[3/4] sm:aspect-[4/3] md:aspect-video"
          }`}
        >
          {started ? (
            <GameIframe slug={game.slug} title={game.title} />
          ) : launchError ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
              <div className="max-w-lg rounded-xl border border-primary/30 bg-black/60 px-5 py-4 text-center backdrop-blur-sm">
                <p className="text-sm sm:text-base text-white">{launchError}</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              {game.thumbnail ? (
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover opacity-60"
                />
              ) : (
                <div className="absolute inset-0 bg-primary/10" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#09050d] via-transparent to-[#09050d]/40" />

              <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6">
                {/* Tap-to-play ring — smaller on mobile to leave room for text */}
                <button
                  onClick={startGame}
                  disabled={isLaunching}
                  className="mb-3 sm:mb-5 p-3 sm:p-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 animate-pulse hover:animate-none hover:bg-primary/30 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label={`Start ${game.title}`}
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary fill-primary" />
                </button>

                <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-white mb-1 sm:mb-2 tracking-tight leading-none">
                  {game.title.toUpperCase()}
                </h2>

                {/* Clamp to 2 lines on mobile so it never pushes the CTA off-screen */}
                <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                  {game.description}
                </p>

                <button
                  onClick={startGame}
                  disabled={isLaunching}
                  className="px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-lg shadow-primary/40 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isLaunching ? "LOADING..." : "START GAME"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Toolbar ── */}
      {!launchError ? (
        <section className="flex flex-row items-center justify-between gap-3 border-b border-primary/10 pb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col min-w-0">
            <h3 className="text-base sm:text-xl font-bold tracking-tight truncate">
              {game.title}
            </h3>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 flex-wrap">
              {game.tags?.map((tag, i) => (
                <span key={tag} className="flex items-center gap-1.5 sm:gap-2">
                  {i > 0 && (
                    <span className="size-1 rounded-full bg-slate-400" />
                  )}
                  {tag}
                </span>
              ))}
              {game.rating != null && (
                <>
                  <span className="size-1 rounded-full bg-slate-400" />
                  <StarRating rating={game.rating} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Icon-only on mobile, labeled on sm+ */}
        <button
          onClick={toggleFullscreen}
          className="flex shrink-0 items-center gap-2 px-3 sm:px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4" />
          ) : (
            <Maximize className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">
            {isFullscreen ? "EXIT FULLSCREEN" : "FULLSCREEN"}
          </span>
        </button>
        </section>
      ) : null}
    </div>
  );
}
