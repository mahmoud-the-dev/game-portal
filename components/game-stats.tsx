interface GameStatsProps {
  /** Stub achievement count — replace with real data when a backend exists */
  achievementProgress?: number;
}

/**
 * Placeholder stats card for the play page.
 *
 * All values are static stubs. When a backend or persistence layer
 * is added, swap these for real queries. The component intentionally
 * accepts no game-specific props yet (YAGNI).
 */
export default function GameStats({
  achievementProgress = 30,
}: GameStatsProps) {
  return (
    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
      <h4 className="font-bold mb-4">Game Stats</h4>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">Players Online</span>
          <span className="text-sm font-bold text-green-500 flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500" />
            1,240
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">Your High Score</span>
          <span className="text-sm font-bold">48,200</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">Achievements</span>
          <span className="text-sm font-bold">12 / 40</span>
        </div>

        <div
          className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2"
          role="progressbar"
          aria-valuenow={achievementProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Achievement progress"
        >
          <div
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${achievementProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
