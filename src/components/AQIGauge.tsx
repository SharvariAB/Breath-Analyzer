import { getAQICategory } from "@/lib/types";

interface AQIGaugeProps {
  aqi: number;
  label?: string;
}

export function AQIGauge({ aqi, label = "Current AQI" }: AQIGaugeProps) {
  const category = getAQICategory(aqi);
  const percentage = Math.min(aqi / 500, 1);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference * (1 - percentage);

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={category.color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold" style={{ color: category.color }}>
            {aqi}
          </span>
        </div>
      </div>
      <span
        className="rounded-full px-3 py-1 text-xs font-semibold"
        style={{ backgroundColor: category.color + "22", color: category.color }}
      >
        {category.label}
      </span>
    </div>
  );
}
