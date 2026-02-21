import type { Metadata } from "next";
import { getGameBySlug, getAllSlugs, getAllGames } from "@/lib/games/registry";
import GamePlayer from "@/components/game-player";
import GameAbout from "@/components/game-about";
import GameStats from "@/components/game-stats";
import PlayNextRow from "@/components/play-next-row";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function GameUnavailableState() {
  return (
    <section className="p-4 lg:p-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-card/50 px-6 py-10 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Game unavailable</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          This game is not available at the moment. Please check back later.
        </p>
      </div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) {
    return {
      title: "Game unavailable",
      description: "This game is not available at the moment.",
    };
  }

  const ogImage = game.ogImage ?? "/og-default.png";

  return {
    title: `${game.title} — Play Now`,
    description: game.description,
    openGraph: {
      title: game.title,
      description: game.description,
      url: `${SITE_URL}/play/${game.slug}`,
      images: [{ url: `${SITE_URL}${ogImage}`, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: game.title,
      description: game.description,
      images: [`${SITE_URL}${ogImage}`],
    },
  };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function PlayPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return <GameUnavailableState />;

  const playNextGames = getAllGames().filter((g) => g.slug !== game.slug);

  return (
    <div className="p-4 lg:p-8 space-y-10">
      {/* Game stage (iframe / pre-game overlay) + toolbar */}
      <GamePlayer game={game} />

      {/* About + Stats two-column layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GameAbout description={game.description} tags={game.tags} />
        <GameStats />
      </section>

      {/* Play Next discovery row */}
      <PlayNextRow games={playNextGames} />
    </div>
  );
}
