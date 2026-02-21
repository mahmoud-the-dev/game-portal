interface TagBadgeProps {
  label: string;
}

export default function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
      {label}
    </span>
  );
}
