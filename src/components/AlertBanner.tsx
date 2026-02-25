import { getAQICategory } from "@/lib/types";

interface AlertBannerProps {
  predictedAQI: number;
}

export function AlertBanner({ predictedAQI }: AlertBannerProps) {
  if (predictedAQI <= 200) return null;

  const isSevere = predictedAQI > 300;

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
        isSevere
          ? "border-destructive/50 bg-destructive/10 glow-red"
          : "border-accent/50 bg-accent/10 glow-amber"
      }`}
    >
      <span className="text-2xl animate-pulse-glow">⚠️</span>
      <div>
        <p className={`text-sm font-semibold ${isSevere ? "text-destructive" : "text-accent"}`}>
          High Pollution Expected Tomorrow
        </p>
        <p className="text-xs text-muted-foreground">
          Predicted AQI: {predictedAQI} ({getAQICategory(predictedAQI).label}) — Take precautions, limit outdoor exposure.
        </p>
      </div>
    </div>
  );
}
