import { PollutionData } from "@/lib/types";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart
} from "recharts";

interface TrendChartProps {
  data: PollutionData[];
}

export function TrendChart({ data }: TrendChartProps) {
  const chartData = data.map(d => ({
    date: d.date.slice(5), // MM-DD
    AQI: d.aqi,
    "PM2.5": d.pm25,
    "PM10": d.pm10,
  }));

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
        30-Day Pollution Trend
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(145, 70%, 45%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(145, 70%, 45%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="pm25Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(38, 90%, 55%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(38, 90%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(220, 15%, 18%)" }}
          />
          <YAxis
            tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(220, 15%, 18%)" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220, 18%, 12%)",
              border: "1px solid hsl(220, 15%, 18%)",
              borderRadius: 8,
              fontFamily: "JetBrains Mono",
              fontSize: 12,
              color: "hsl(160, 10%, 90%)",
            }}
          />
          <Legend
            wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: 11 }}
          />
          <Area type="monotone" dataKey="AQI" stroke="hsl(145, 70%, 45%)" fill="url(#aqiGrad)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="PM2.5" stroke="hsl(38, 90%, 55%)" fill="url(#pm25Grad)" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="PM10" stroke="hsl(220, 10%, 50%)" strokeWidth={1} dot={false} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
