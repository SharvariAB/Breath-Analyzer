import { CITIES } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CitySelectorProps {
  value: string;
  onChange: (city: string) => void;
}

export function CitySelector({ value, onChange }: CitySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-secondary border-border font-mono text-sm">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        {CITIES.map((city) => (
          <SelectItem key={city.name} value={city.name} className="font-mono text-sm">
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
