import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Country } from "@/data/countries";

interface CountryCardProps {
  country: Country;
  index?: number;
  onViewDetails?: () => void;
  onCompare?: () => void;
  onSave?: () => void;
  showActions?: boolean;
}

export function CountryCard({ country, index = 0, onViewDetails, onCompare, onSave, showActions = true }: CountryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{country.flag}</span>
          <div>
            <h3 className="font-semibold text-card-foreground">{country.name}</h3>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{country.region}</p>
          </div>
        </div>
        <div className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
          {country.score}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-y border-border/50 py-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">Avg. Salary</p>
          <p className="text-sm font-medium tabular-nums">${country.salary.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">Cost Index</p>
          <p className="text-sm font-medium tabular-nums">{country.costOfLiving}/100</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">Visa Difficulty</p>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 w-4 rounded-full ${i <= country.visaDifficulty ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">Healthcare</p>
          <p className="text-sm font-medium tabular-nums">{country.healthcareQuality}/100</p>
        </div>
      </div>

      {showActions && (
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={onViewDetails}>
            Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={onCompare}>
            Compare
          </Button>
          <Button size="sm" className="flex-1 text-xs" onClick={onSave}>
            Save
          </Button>
        </div>
      )}
    </motion.div>
  );
}
