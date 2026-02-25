// City configurations with bounding boxes
export interface CityConfig {
  name: string;
  lat: number;
  lng: number;
  bbox: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
}

export const CITIES: CityConfig[] = [
  { name: "Delhi", lat: 28.6139, lng: 77.209, bbox: [76.8, 28.4, 77.4, 28.9] },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, bbox: [72.7, 18.9, 73.1, 19.3] },
  { name: "Pune", lat: 18.5204, lng: 73.8567, bbox: [73.7, 18.4, 74.0, 18.7] },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, bbox: [77.4, 12.8, 77.8, 13.1] },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, bbox: [88.2, 22.4, 88.5, 22.7] },
];

export interface PollutionData {
  date: string;
  no2: number;
  co: number;
  so2: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  aqi: number;
  // Derived features
  pm25_rolling_avg?: number;
  pm10_rolling_avg?: number;
  aqi_lag1?: number;
}

export interface AQICategory {
  label: string;
  range: string;
  color: string;
  bgClass: string;
  textClass: string;
}

export const AQI_CATEGORIES: AQICategory[] = [
  { label: "Good", range: "0–50", color: "hsl(145, 70%, 45%)", bgClass: "bg-chart-good/20", textClass: "text-chart-good" },
  { label: "Moderate", range: "51–100", color: "hsl(50, 90%, 55%)", bgClass: "bg-chart-moderate/20", textClass: "text-chart-moderate" },
  { label: "Poor", range: "101–200", color: "hsl(25, 90%, 55%)", bgClass: "bg-chart-poor/20", textClass: "text-chart-poor" },
  { label: "Very Poor", range: "201–300", color: "hsl(0, 80%, 55%)", bgClass: "bg-chart-very-poor/20", textClass: "text-chart-very-poor" },
  { label: "Severe", range: "301+", color: "hsl(340, 80%, 50%)", bgClass: "bg-chart-severe/20", textClass: "text-chart-severe" },
];

export function getAQICategory(aqi: number): AQICategory {
  if (aqi <= 50) return AQI_CATEGORIES[0];
  if (aqi <= 100) return AQI_CATEGORIES[1];
  if (aqi <= 200) return AQI_CATEGORIES[2];
  if (aqi <= 300) return AQI_CATEGORIES[3];
  return AQI_CATEGORIES[4];
}

export interface PredictionResult {
  predictedAQI: number;
  rmse: number;
  r2Score: number;
  model: string;
}

export interface MLMetrics {
  randomForest: PredictionResult;
  linearRegression: PredictionResult;
}
