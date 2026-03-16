import { useState } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries, type Country } from "@/data/countries";

export default function Compare() {
  const [selected, setSelected] = useState<(string | null)[]>(["canada", "germany", "portugal"]);

  const updateSlot = (index: number, value: string) => {
    setSelected(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const selectedCountries = selected.map(id => countries.find(c => c.id === id)).filter(Boolean) as Country[];

  const metrics = [
    { label: "Compatibility Score", key: "score", suffix: "%" },
    { label: "Average Salary", key: "salary", prefix: "$", format: true },
    { label: "Cost of Living Index", key: "costOfLiving", suffix: "/100" },
    { label: "Visa Difficulty", key: "visaDifficulty", suffix: "/3" },
    { label: "Safety Score", key: "safetyScore", suffix: "/100" },
    { label: "Healthcare Quality", key: "healthcareQuality", suffix: "/100" },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Compare Countries</h1>
          <p className="mb-8 text-muted-foreground">Side-by-side comparison of up to 3 countries</p>

          {/* Selectors */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 1, 2].map(i => (
              <Select key={i} value={selected[i] || ""} onValueChange={v => updateSlot(i, v)}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select country ${i + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.flag} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Metric</th>
                  {selectedCountries.map(c => (
                    <th key={c.id} className="p-4 text-center">
                      <span className="mr-2 text-xl">{c.flag}</span>
                      <span className="font-semibold text-card-foreground">{c.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((m, i) => {
                  const values = selectedCountries.map(c => (c as unknown as Record<string, unknown>)[m.key] as number);
                  const best = Math.max(...values);

                  return (
                    <tr key={m.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                      <td className="p-4 text-sm font-medium text-muted-foreground">{m.label}</td>
                      {selectedCountries.map(c => {
                        const val = (c as unknown as Record<string, unknown>)[m.key] as number;
                        const isBest = val === best;
                        return (
                          <td key={c.id} className="p-4 text-center">
                            <span className={`tabular-nums text-sm font-medium ${isBest ? "text-primary font-bold" : "text-card-foreground"}`}>
                              {m.prefix || ""}{m.format ? val.toLocaleString() : val}{m.suffix || ""}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Cost breakdown rows */}
                {["rent", "food", "transport", "taxes"].map((key, i) => {
                  const values = selectedCountries.map(c => c.costBreakdown[key as keyof typeof c.costBreakdown]);
                  const best = Math.min(...values);
                  return (
                    <tr key={key} className={((metrics.length + i) % 2 === 0) ? "bg-muted/30" : ""}>
                      <td className="p-4 text-sm font-medium capitalize text-muted-foreground">Monthly {key}</td>
                      {selectedCountries.map(c => {
                        const val = c.costBreakdown[key as keyof typeof c.costBreakdown];
                        return (
                          <td key={c.id} className="p-4 text-center">
                            <span className={`tabular-nums text-sm font-medium ${val === best ? "text-primary font-bold" : "text-card-foreground"}`}>
                              ${val.toLocaleString()}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
