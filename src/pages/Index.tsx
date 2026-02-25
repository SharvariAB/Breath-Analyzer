import { useState, useMemo, useEffect } from "react";
import { CitySelector } from "@/components/CitySelector";
import { AQIGauge } from "@/components/AQIGauge";
import { MetricCard } from "@/components/MetricCard";
import { TrendChart } from "@/components/TrendChart";
import { AlertBanner } from "@/components/AlertBanner";
import { PredictionPanel } from "@/components/PredictionPanel";
import { CityMap } from "@/components/CityMap";
import { AQILegend } from "@/components/AQILegend";
import { generateCityData } from "@/lib/dataGenerator";
import { runPrediction, generateCSVReport, downloadCSV } from "@/lib/mlEngine";
import { Button } from "@/components/ui/button";
import { Download, Wind, Activity } from "lucide-react";

const Index = () => {
  const [city, setCity] = useState("Delhi");
  const [liveData, setLiveData] = useState<any>(null);

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

const cityCoordinates: any = {
  Delhi: { lat: 28.6139, lon: 77.2090 },
  Mumbai: { lat: 19.0760, lon: 72.8777 },
  Pune: { lat: 18.5204, lon: 73.8567 },
};

useEffect(() => {
  const fetchAQI = async () => {
    const coords = cityCoordinates[city];
    if (!coords) return;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    );

    const data = await response.json();
    setLiveData(data);
  };

  fetchAQI();
  const interval = setInterval(fetchAQI, 300000);

  return () => clearInterval(interval);
}, [city]);

  const data = useMemo(() => generateCityData(city, 30), [city]);
  const latest = {
  ...data[data.length - 1],
  aqi: liveData
  ? Math.round(liveData.list[0].components.pm2_5 * 1.8)
  : data[data.length - 1].aqi,
  pm25: liveData ? liveData.list[0].components.pm2_5 : data[data.length - 1].pm25,
  pm10: liveData ? liveData.list[0].components.pm10 : data[data.length - 1].pm10,
  no2: liveData ? liveData.list[0].components.no2 : data[data.length - 1].no2,
  co: liveData ? liveData.list[0].components.co : data[data.length - 1].co,
  so2: liveData ? liveData.list[0].components.so2 : data[data.length - 1].so2,
};
  const mlMetrics = useMemo(() => runPrediction(data), [data]);
  const predictedAQI = mlMetrics.randomForest.predictedAQI;

  const handleDownload = () => {
  const updatedData = [...data.slice(0, -1), latest];
  const csv = generateCSVReport(updatedData, city);
  downloadCSV(csv, `breath-analyzer-${city.toLowerCase()}-report.csv`);
};

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-green">
              <Wind className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-mono text-lg font-bold tracking-tight text-foreground">
                Breath-Analyzer
              </h1>
              <p className="text-xs text-muted-foreground">
                Hyper-Local Predictive Air Quality Alerts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CitySelector value={city} onChange={setCity} />
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2 font-mono text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              CSV Report
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Alert */}
        <AlertBanner predictedAQI={predictedAQI} />

        {/* Top row: AQI + Metrics */}
        <div className="grid gap-4 md:grid-cols-[auto_1fr]">
          <AQIGauge aqi={latest.aqi} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <MetricCard label="PM2.5" value={latest.pm25} unit="μg/m³" icon="🔴" />
            <MetricCard label="PM10" value={latest.pm10} unit="μg/m³" icon="🟠" />
            <MetricCard label="NO₂" value={latest.no2} unit="ppb" icon="🟡" />
            <MetricCard label="CO" value={latest.co} unit="mg/m³" icon="🔵" />
            <MetricCard label="SO₂" value={latest.so2} unit="ppb" icon="🟣" />
            <MetricCard label="Temperature" value={latest.temperature} unit="°C" icon="🌡️" />
            <MetricCard label="Humidity" value={latest.humidity} unit="%" icon="💧" />
            <MetricCard label="Predicted AQI" value={predictedAQI} unit="tomorrow" icon="🧠" />
          </div>
        </div>

        {/* AQI Legend */}
        <AQILegend />

        {/* Charts + Prediction */}
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <TrendChart data={[...data.slice(0, -1), latest]} />
          <PredictionPanel metrics={mlMetrics} />
        </div>

        {/* Map + Data Sources */}
        <div className="grid gap-4 md:grid-cols-2">
          <CityMap cityName={city} />
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              Data Sources & Architecture
            </h3>
            <div className="space-y-3 font-mono text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-primary">▸</span>
                <div>
                  <p className="text-foreground">Sentinel-5P Satellite Data</p>
                  <p>COPERNICUS/S5P — NO₂, CO, SO₂ columns</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">▸</span>
                <div>
                  <p className="text-foreground">Simulated IoT Sensors</p>
                  <p>PM2.5, PM10, Temperature, Humidity</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">▸</span>
                <div>
                  <p className="text-foreground">ML Pipeline</p>
                  <p>Feature engineering → Random Forest + Linear Regression</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">▸</span>
                <div>
                  <p className="text-foreground">Alert System</p>
                  <p>AQI &gt; 200 triggers precautionary alerts</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">
                Last updated: {liveData ? new Date().toLocaleString() : latest.date}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-4 text-center font-mono text-xs text-muted-foreground">
          Breath-Analyzer v1.0 — AI-Powered Air Quality Monitoring Prototype
        </footer>
      </main>
    </div>
  );
};

export default Index;
