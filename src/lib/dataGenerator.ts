import { PollutionData, CityConfig, CITIES } from "./types";

// Seeded random for reproducibility per city
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// City-specific pollution baselines (Indian cities have varying AQI)
const CITY_BASELINES: Record<string, { pm25Base: number; pm10Base: number; no2Base: number; coBase: number; so2Base: number }> = {
  Delhi: { pm25Base: 120, pm10Base: 180, no2Base: 45, coBase: 1.8, so2Base: 18 },
  Mumbai: { pm25Base: 65, pm10Base: 110, no2Base: 30, coBase: 1.2, so2Base: 12 },
  Pune: { pm25Base: 55, pm10Base: 90, no2Base: 25, coBase: 0.9, so2Base: 10 },
  Bangalore: { pm25Base: 50, pm10Base: 85, no2Base: 22, coBase: 0.8, so2Base: 8 },
  Kolkata: { pm25Base: 80, pm10Base: 140, no2Base: 35, coBase: 1.4, so2Base: 14 },
};

function calculateAQI(pm25: number, pm10: number): number {
  // Simplified AQI calculation based on PM2.5 (dominant pollutant in Indian cities)
  const pm25AQI = pm25 <= 30 ? pm25 * (50 / 30)
    : pm25 <= 60 ? 50 + (pm25 - 30) * (50 / 30)
    : pm25 <= 90 ? 100 + (pm25 - 60) * (100 / 30)
    : pm25 <= 120 ? 200 + (pm25 - 90) * (100 / 30)
    : 300 + (pm25 - 120) * (100 / 130);

  const pm10AQI = pm10 <= 50 ? pm10
    : pm10 <= 100 ? 50 + (pm10 - 50)
    : pm10 <= 250 ? 100 + (pm10 - 100) * (100 / 150)
    : pm10 <= 350 ? 200 + (pm10 - 250)
    : 300 + (pm10 - 350) * (100 / 80);

  return Math.round(Math.max(pm25AQI, pm10AQI));
}

export function generateCityData(cityName: string, days: number = 30): PollutionData[] {
  const baseline = CITY_BASELINES[cityName] || CITY_BASELINES.Delhi;
  const rand = seededRandom(cityName.length * 1000 + days);
  const data: PollutionData[] = [];

  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Add realistic variation: weekly pattern + random noise
    const dayOfWeek = date.getDay();
    const weekdayFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.85 : 1.0 + (rand() * 0.15);
    const trendNoise = Math.sin(i / 7 * Math.PI) * 0.15; // Weekly sinusoidal pattern

    const pm25 = Math.max(5, baseline.pm25Base * weekdayFactor * (0.7 + rand() * 0.6 + trendNoise));
    const pm10 = Math.max(10, baseline.pm10Base * weekdayFactor * (0.7 + rand() * 0.6 + trendNoise));
    const no2 = Math.max(2, baseline.no2Base * (0.6 + rand() * 0.8));
    const co = Math.max(0.1, baseline.coBase * (0.5 + rand() * 1.0));
    const so2 = Math.max(1, baseline.so2Base * (0.5 + rand() * 1.0));
    const temperature = 22 + rand() * 18; // 22-40°C range for Indian cities
    const humidity = 30 + rand() * 55; // 30-85%

    data.push({
      date: date.toISOString().split("T")[0],
      no2: Math.round(no2 * 100) / 100,
      co: Math.round(co * 1000) / 1000,
      so2: Math.round(so2 * 100) / 100,
      pm25: Math.round(pm25 * 10) / 10,
      pm10: Math.round(pm10 * 10) / 10,
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round(humidity * 10) / 10,
      aqi: calculateAQI(pm25, pm10),
    });
  }

  // Add rolling averages and lag features
  for (let i = 0; i < data.length; i++) {
    // 3-day rolling average
    if (i >= 2) {
      data[i].pm25_rolling_avg = Math.round(((data[i].pm25 + data[i - 1].pm25 + data[i - 2].pm25) / 3) * 10) / 10;
      data[i].pm10_rolling_avg = Math.round(((data[i].pm10 + data[i - 1].pm10 + data[i - 2].pm10) / 3) * 10) / 10;
    }
    // Lag-1 AQI
    if (i >= 1) {
      data[i].aqi_lag1 = data[i - 1].aqi;
    }
  }

  return data;
}

export function getCityConfig(name: string): CityConfig {
  return CITIES.find(c => c.name === name) || CITIES[0];
}
