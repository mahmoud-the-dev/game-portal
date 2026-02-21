"use client";

interface GameIframeProps {
  slug: string;
  title: string;
}

/**
 * Sandboxed iframe that loads a static game from /public/games/<slug>/.
 *
 * Sandbox policy:
 *   allow-scripts        — the game needs JS execution
 *   allow-same-origin    — lets the game access localStorage
 *
 * Everything else (top-navigation, popups, forms, etc.) is blocked by
 * default which isolates React's state tree from any game-loop crash.
 */
export default function GameIframe({ slug, title }: GameIframeProps) {
  return (
    <iframe
      src={`/games/${slug}/index.html`}
      title={title}
      sandbox="allow-scripts allow-same-origin"
      allow="autoplay"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
