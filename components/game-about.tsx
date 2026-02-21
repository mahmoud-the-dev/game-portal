import TagBadge from "@/components/tag-badge";

interface GameAboutProps {
  description: string;
  tags?: string[];
}

export default function GameAbout({ description, tags }: GameAboutProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <h4 className="text-lg font-bold">About the Game</h4>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
      {tags && tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
