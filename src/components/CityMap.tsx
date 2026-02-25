import { getCityConfig } from "@/lib/dataGenerator";

interface CityMapProps {
  cityName: string;
}

export function CityMap({ cityName }: CityMapProps) {
  const city = getCityConfig(cityName);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
        Monitoring Region
      </h3>
      <div className="relative overflow-hidden rounded-md bg-secondary" style={{ height: 200 }}>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${city.lat},${city.lng}&zoom=11&size=600x200&maptype=roadmap&style=feature:all|element:geometry|color:0x1a1f2e&style=feature:all|element:labels.text.fill|color:0x8a8f9e&style=feature:water|element:geometry|color:0x0d1117&style=feature:road|element:geometry|color:0x2d3348&key=none`}
          alt={`Map of ${cityName}`}
          className="h-full w-full object-cover opacity-40"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Fallback map visualization */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow" />
            <div className="absolute -inset-3 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-6 rounded-full border border-primary/15" />
          </div>
          <div className="mt-4 text-center font-mono text-xs">
            <p className="text-foreground">{cityName}</p>
            <p className="text-muted-foreground">
              {city.lat.toFixed(4)}°N, {city.lng.toFixed(4)}°E
            </p>
          </div>
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(220, 15%, 18%, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(220, 15%, 18%, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }} />
      </div>
    </div>
  );
}
