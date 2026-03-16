import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { countries, cities } from "@/data/countries";

const lifestyleTiers: Record<string, number> = { frugal: 0.7, moderate: 1, luxury: 1.5 };

export default function CostExplorer() {
  const [countryId, setCountryId] = useState("portugal");
  const [city, setCity] = useState("Lisbon");
  const [salary, setSalary] = useState([4000]);
  const [tier, setTier] = useState("moderate");

  const country = countries.find(c => c.id === countryId)!;
  const multiplier = lifestyleTiers[tier];

  const costs = useMemo(() => {
    const base = country.costBreakdown;
    return {
      rent: Math.round(base.rent * multiplier),
      food: Math.round(base.food * multiplier),
      transport: Math.round(base.transport * multiplier),
      taxes: Math.round(base.taxes * multiplier),
      utilities: Math.round(base.utilities * multiplier),
      entertainment: Math.round(base.entertainment * multiplier),
    };
  }, [country, multiplier]);

  const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);
  const surplus = salary[0] - totalCost;

  const costEntries = Object.entries(costs);
  const colors = ["bg-primary", "bg-accent", "bg-success", "bg-warning", "bg-destructive", "bg-muted-foreground"];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Cost of Living Explorer</h1>
          <p className="mb-8 text-muted-foreground">Analyze your monthly expenses in any destination</p>

          {/* Controls */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Country</p>
              <Select value={countryId} onValueChange={v => { setCountryId(v); setCity(cities[v]?.[0] || ""); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {countries.map(c => <SelectItem key={c.id} value={c.id}>{c.flag} {c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">City</p>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(cities[countryId] || []).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly Salary (USD)</p>
              <Slider value={salary} onValueChange={setSalary} min={1000} max={15000} step={100} className="mt-3" />
              <p className="mt-1 text-sm font-medium tabular-nums text-foreground">${salary[0].toLocaleString()}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Lifestyle Tier</p>
              <div className="mt-1 grid grid-cols-3 gap-1">
                {Object.keys(lifestyleTiers).map(t => (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium capitalize transition-colors ${
                      tier === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Surplus hero */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6 text-center shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly Surplus</p>
            <p className={`text-4xl font-bold tabular-nums ${surplus >= 0 ? "text-success" : "text-destructive"}`}>
              {surplus >= 0 ? "+" : ""}${surplus.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{city}, {country.name}</p>
          </div>

          {/* Donut-style bar chart */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-4 font-semibold text-card-foreground">Expense Breakdown</h3>
              <div className="space-y-3">
                {costEntries.map(([key, value], i) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${colors[i]}`} />
                      <span className="text-sm capitalize text-muted-foreground">{key}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-muted">
                        <div className={`h-full rounded-full ${colors[i]}`} style={{ width: `${(value / totalCost) * 100}%` }} />
                      </div>
                      <span className="w-14 text-right text-sm font-medium tabular-nums">${value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-sm font-bold tabular-nums text-foreground">${totalCost.toLocaleString()}/mo</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-4 font-semibold text-card-foreground">Budget Allocation</h3>
              {/* Stacked bar */}
              <div className="mb-6 flex h-8 overflow-hidden rounded-lg">
                {costEntries.map(([key, value], i) => (
                  <div
                    key={key}
                    className={`${colors[i]} transition-all`}
                    style={{ width: `${(value / totalCost) * 100}%` }}
                    title={`${key}: $${value}`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {costEntries.map(([key, value], i) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${colors[i]}`} />
                    <span className="text-xs capitalize text-muted-foreground">{key}</span>
                    <span className="ml-auto text-xs font-medium tabular-nums">{Math.round((value / totalCost) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
