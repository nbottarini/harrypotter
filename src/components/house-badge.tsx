import Link from "next/link";
import { houseById, type HouseId } from "@/data/potterpedia";

type HouseBadgeProps = {
  house?: HouseId;
  compact?: boolean;
};

export function HouseBadge({ house, compact }: HouseBadgeProps) {
  if (!house) {
    return (
      <span className="inline-flex min-h-8 items-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-zinc-300">
        Sin casa de Hogwarts
      </span>
    );
  }

  const data = houseById[house];

  return (
    <Link
      href={`/casas/${house}`}
      className={`inline-flex min-h-8 items-center gap-2 rounded-full border ${data.border} bg-white/[0.05] px-3 text-xs font-semibold text-zinc-100 transition hover:bg-white/[0.1]`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${houseDot[house]}`} />
      {compact ? data.name.slice(0, 1) : data.name}
    </Link>
  );
}

const houseDot: Record<HouseId, string> = {
  gryffindor: "bg-[#d33a3f]",
  slytherin: "bg-[#39a86b]",
  ravenclaw: "bg-[#4378d6]",
  hufflepuff: "bg-[#e4bd37]",
};
