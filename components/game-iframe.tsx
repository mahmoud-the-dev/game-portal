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
			scrolling="no"
			allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write; accelerometer; gyroscope; "
			allowFullScreen={true}
			sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads  allow-popups allow-popups-to-escape-sandbox"
			loading="eager"
			data-hj-allow-iframe="true"
			style={{ width: "100%", height: "100%", border: "none" }}
		/>
	);
}
