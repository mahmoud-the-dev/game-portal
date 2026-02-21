import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <span className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
      <span>{rating.toFixed(1)}</span>
    </span>
  );
}
