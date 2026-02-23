export interface GameMeta {
	slug: string;
	title: string;
	description: string;
	/** Relative to /public — e.g. "/games/tetris/og.png" */
	ogImage?: string;
	tags?: string[];
	/** ISO-8601 date string */
	addedAt: string;
	/** URL or path for the game's thumbnail image */
	thumbnail?: string;
	/** Human-readable play count, e.g. "1.2M plays" */
	playCount?: string;
	/** Star rating out of 5 */
	rating?: number;
	/** Optional badge label, e.g. "HOT", "NEW" */
	badge?: string;
	/** Optional external URL for a gameplay trailer video */
	videoTrailer?: string;
}

/**
 * Static game catalogue.
 *
 * Every game that lives in /public/games/<slug>/index.html needs a
 * corresponding entry here so the portal can generate its route, SEO
 * metadata, and OG tags at build time.
 */
const games: GameMeta[] = [
	{
		slug: "orbital-defender",
		title: "Orbital Defender",
		description:
			"Defend your central core against relentless 360-degree enemy swarms in this fast-paced survival shooter.",
		addedAt: "2026-02-23",
		tags: ["Shooter", "Survival", "Arcade"],
		thumbnail: "/images/orbital-defender.png",
		playCount: "12K plays",
		rating: 4.8,
		badge: "HOT",
	},
	{
		slug: "elemental-merge-drop",
		title: "Elemental Merge Drop",
		description:
			"Drop and combine elemental orbs to discover cosmic singularities before the box overflows.",
		addedAt: "2026-02-23",
		tags: ["Merge", "Physics", "Puzzle"],
		thumbnail: "/images/elemental-merge-drop.png",
		playCount: "12K plays",
		rating: 4.8,
		badge: "NEW",
	},
	{
		slug: "gravity-shift-runner",
		title: "Gravity Shift",
		description:
			"Master gravity manipulation to navigate challenging platforming levels in this fast-paced runner.",
		addedAt: "2026-02-22",
		tags: ["Platformer", "Runner"],
		thumbnail: "/images/gravity-shift-runner.png",
		playCount: "45K plays",
		rating: 4.3,
		badge: "NEW",
	},
	{
		slug: "snake-game",
		title: "Snake Game",
		description: "A classic snake game.",
		addedAt: "2026-02-21",
		tags: ["Classic", "Snake"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDzQmqzngs3GozgOelsNzv8Z6dBHoFA-rf4msxl-cdX8vi4vR1Uap95sTjgHc_68JDTozClBMqkYclcfGI6Te1c-Jvfxyi733IVWhgWAmaF8Ta7ePWQORTw0S3s66cS5d6aRqB25wXUJpWg4gjyK2NhmPRLYVm9hofH4rzu0-tqM_1NYJDpTjW0yZqJ0vwMTq3Qt12cddfcCdhqEhkUQQ1Nk4Ye_dujeB0Fw8w6bi7HYYdrm5VlFLnD8ZTG6Th_K8WVBUold4FSURCZ",
		playCount: "1.2M plays",
		rating: 4.9,
	},
	{
		slug: "sudoku",
		title: "Sudoku",
		description: "A classic Sudoku game.",
		addedAt: "2026-02-21",
		tags: ["Puzzle", "Classic"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDBlv9hUu9CgppPx5T39GXQlPF2E1cyKO8UxquxTXY8m3NcnQOqIwJR4QKL-KDO_8bXQGFRpFEft148761Fd-3aFx4BaWv2c5zzIpcsKrlAqCZmjKqgOCp_GMdn0Tj249yk3Q3tYgaXIem92wn7Aky1jcBxf8dUqUQYCSzoo31jXgRG34YGAMpA6fYdIlKAOWarqtYmLEsSQzIglBOg8gFwsluMepO_VnCJC7a2-Yry3MrqXh4saScOn-Y_X-nO3w4dRbwghyfod7i-",
		playCount: "2.4M plays",
		rating: 5.0,
		badge: "HOT",
		videoTrailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		slug: "sample-clicker",
		title: "Sample Clicker",
		description:
			"A minimal click-counter game used to verify the portal's sandboxing, routing, and localStorage namespacing.",
		addedAt: "2026-02-20",
		tags: ["Casual", "Clicker"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDzQmqzngs3GozgOelsNzv8Z6dBHoFA-rf4msxl-cdX8vi4vR1Uap95sTjgHc_68JDTozClBMqkYclcfGI6Te1c-Jvfxyi733IVWhgWAmaF8Ta7ePWQORTw0S3s66cS5d6aRqB25wXUJpWg4gjyK2NhmPRLYVm9hofH4rzu0-tqM_1NYJDpTjW0yZqJ0vwMTq3Qt12cddfcCdhqEhkUQQ1Nk4Ye_dujeB0Fw8w6bi7HYYdrm5VlFLnD8ZTG6Th_K8WVBUold4FSURCZ",
		playCount: "320K plays",
		rating: 4.2,
	},
	{
		slug: "steel-vanguard",
		title: "Steel Vanguard",
		description:
			"Pilot massive mechs across desert wastelands in fast-paced action combat.",
		addedAt: "2026-02-15",
		tags: ["Action", "Mecha"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCPWvDnX11LIT0Ot0EC1U4SewwrGf8NJlHJsq7RYgMOdRC3KxNZOMUJmBQ_Qd9N5l_7QoScfAE3oJYwZvFFskQ0r8hN241zLbFxiZ0sMzHwrrzh2lMLrUxotYhxrHPLm0out5eWl-Evc-375gzOAE_0QiZF8pFsJstiM_ZjoY1VH0D_NHTeaHNGXwfJ-51WmZ1K52odnRnSXxJBs0ERgJ0iJP93zJ9jDwptAYqItxEb2og1QLGIahQEcbqbovAoiphekQSdncHPGZtQ",
		playCount: "850K plays",
		rating: 4.7,
	},
	{
		slug: "prism-realms",
		title: "Prism Realms",
		description:
			"Solve mind-bending puzzles in colorful low-poly geometric landscapes.",
		addedAt: "2026-02-10",
		tags: ["Puzzle", "Strategy"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuC4DayqPde6kZCXrO6Sy_UyM42p352jB-Bd6HpsggiJmeH98kgUJo_dZ_nO4OOJB061BGJ08oHU3uGAKaA9DI6qrxTUMtLKQMuQVJ75-88XHsnNwu3-zQdHc5D5693qp7tyQ2n6ngp9fY61RoQsekysDrV-VJf8vGcJYlfSWVRt-UWvOe54F9CJClSHJC0tHr5b6TpRW6ecdr9XU5mulRyC33fOvk_ILMXxzIDrp2dybAmDG4whfZUQUuSqh-SDORpeUOFQzbnFonO5",
		playCount: "430K plays",
		rating: 4.5,
	},
	{
		slug: "citadel-siege",
		title: "Citadel Siege",
		description:
			"Command armies and lay siege to epic medieval mountain castles.",
		addedAt: "2026-02-08",
		tags: ["Strategy", "PvP"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuDHSABnlnx3YKEbTuGGwfSuE6Fuv73DDEkK4t5Fq9Wc9vZrtNVt6umzT7KsiJL4uW1rcchf2LA_EHbyQyCeh3hBb-4ov5fPnV-Xq7mGJh4LUO55epNU-PXCcjC0J5KQoGOc1A5RyjIN9DfxIVFSE2jm2hrS1sxggcmuAj5pmKjzh5sp2JlOfBWr3-KfPC83t4F68YLY1EdaHhVg60Kj8M50GJOoAG8G5SZRH3OLZDtfFyETXlRhLAJfkDVUdDFL88W9YYw9NlIcJSmr",
		playCount: "2.1M plays",
		rating: 4.8,
	},
	{
		slug: "cosmos-explorer",
		title: "Cosmos Explorer",
		description:
			"Navigate the cosmos through abstract nebula clouds in this open-world sandbox.",
		addedAt: "2026-02-05",
		tags: ["Sci-Fi", "Sandbox"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuA9FvgqZutB_GSkcQZrD6nDk6aR36drV1RwMo_u9yvnBs02_futepQJ06tjSfjNBNxj--VMPMBdDOiO7FTyuSh8FTbPw3_vzWVLtzb7Sm32rUNKxcgxNkYjNazTnSF5xXGM0tqgQohkHUvJFokaaz9cTbws5HrPCwcSE5wOsov03AoVZM6aZ_6d7ra3miUFOjGArVC8n-tPgwuLhqd7byFWkMZVFKadVWNPN9yjwi7YN2wpU1fpxvpYffdrUDv7FrJJLwpHV-bZ3J5z",
		playCount: "610K plays",
		rating: 4.6,
	},
	{
		slug: "hack-the-grid",
		title: "Hack The Grid",
		description:
			"Become the ultimate hacker in this retro simulation indie game.",
		addedAt: "2026-02-03",
		tags: ["Simulation", "Indie"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuB82UrYeBYrk8OSFxM4elknpSAfZDNcOImJ3eWDLZunq4S5q7BIAW2a3g5MDzzPV125xhsjs_7YCdEivs56aX_ppQGbbbK4WCxoaSLlRI1KOt_VU0AqMeQ5jlLqYc2ZQqzosMgumY6w2Yqs6bddbMwFY93Ki0vrWjcMUOrYl04hbiJX2Ydh0c8Awvnz0IhOTS7Yc__rTBEmVeOjqgWeo6gI2eNLCS55ONNIBvJBgcOhVzz1ZqzyBndEqiaxGCf7-pC_pYaSUADN5xoz",
		playCount: "150K plays",
		rating: 4.2,
	},
	{
		slug: "whisper-forest",
		title: "Whisper Forest",
		description:
			"Survive the dark, mystical forest filled with supernatural threats.",
		addedAt: "2026-02-01",
		tags: ["Horror", "Survival"],
		thumbnail:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuBgo--snlwhm5c6DB-IoGglH6ste2RB1u6lp6050eCLw4EuJSj1zHBnKq5lf8LF3ABg7caB8P1r3lCkkezLrh1uqQHl5jOABwEOxaHqmMWg_ToP-bv43NvOkyYAmXFBgYl1kQYAUBFDlveLcwLqr3iW9ZfGQHu0Q2X8kyZArQfC4fC8L7VFs_eysdMvF4qQUvyJCX-FQoLiChMBP1cJS1LCIcCI565fFFH2dzTL8k5-_kfer3zMp6QZsbqL4ZXL1QKlYnYNvdD3eCfQ",
		playCount: "3.7M plays",
		rating: 4.9,
	},
];

const slugIndex = new Map<string, GameMeta>(games.map((g) => [g.slug, g]));

export function getGameBySlug(slug: string): GameMeta | undefined {
	return slugIndex.get(slug);
}

export function getAllGames(): GameMeta[] {
	return games;
}

export function getAllSlugs(): string[] {
	return games.map((g) => g.slug);
}
