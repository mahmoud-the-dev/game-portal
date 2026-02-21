"use client";

import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [active, setActive] = useState(categories[0] ?? "All Games");

  return (
    <section className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`whitespace-nowrap px-6 py-2 rounded-xl font-medium transition-all ${
            cat === active
              ? "bg-primary text-white"
              : "bg-primary/10 text-slate-600 dark:text-slate-300 hover:bg-primary/20"
          }`}
        >
          {cat}
        </button>
      ))}
    </section>
  );
}
