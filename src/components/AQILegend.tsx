import { AQI_CATEGORIES } from "@/lib/types";

export function AQILegend() {
  return (
    <div className="flex flex-wrap gap-2">
      {AQI_CATEGORIES.map((cat) => (
        <div
          key={cat.label}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs"
          style={{ backgroundColor: cat.color + "18", color: cat.color }}
        >
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
          {cat.label} ({cat.range})
        </div>
      ))}
    </div>
  );
}
