import { MLMetrics } from "@/lib/types";
import { AQIGauge } from "./AQIGauge";

interface PredictionPanelProps {
  metrics: MLMetrics;
}

export function PredictionPanel({ metrics }: PredictionPanelProps) {
  const rf = metrics.randomForest;
  const lr = metrics.linearRegression;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
        ML Prediction — Next Day
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <AQIGauge aqi={rf.predictedAQI} label="Random Forest" />
          <div className="mt-2 space-y-1 text-center font-mono text-xs text-muted-foreground">
            <p>RMSE: <span className="text-foreground">{rf.rmse}</span></p>
            <p>R²: <span className="text-foreground">{rf.r2Score}</span></p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <AQIGauge aqi={lr.predictedAQI} label="Linear Regression" />
          <div className="mt-2 space-y-1 text-center font-mono text-xs text-muted-foreground">
            <p>RMSE: <span className="text-foreground">{lr.rmse}</span></p>
            <p>R²: <span className="text-foreground">{lr.r2Score}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
