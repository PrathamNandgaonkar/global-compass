import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Users, DollarSign, Shield, Heart, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";

export default function CountryDetails() {
  const { id } = useParams();
  const country = countries.find(c => c.id === id);

  if (!country) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Country not found.</p>
          <Link to="/explore"><Button variant="outline" className="mt-4">Back to Explore</Button></Link>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Users, label: "Population", value: country.population },
    { icon: Globe, label: "Languages", value: country.languages.join(", ") },
    { icon: DollarSign, label: "Currency", value: country.currency },
    { icon: Shield, label: "Safety", value: `${country.safetyScore}/100` },
    { icon: Heart, label: "Healthcare", value: `${country.healthcareQuality}/100` },
    { icon: Briefcase, label: "GDP", value: country.gdp },
  ];

  const costs = country.costBreakdown;
  const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link to="/explore" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{country.name}</h1>
              <p className="text-muted-foreground">{country.region} · {country.climate} Climate</p>
            </div>
            <div className="ml-auto rounded-lg bg-primary/10 px-4 py-2 text-lg font-bold text-primary">
              {country.score}% Match
            </div>
          </div>

          <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">{country.description}</p>

          {/* Stats grid */}
          <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <s.icon className="mb-2 h-4 w-4 text-primary" strokeWidth={1.5} />
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="text-sm font-semibold text-card-foreground">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-foreground">Monthly Cost Breakdown</h2>
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="space-y-3">
                {Object.entries(costs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm capitalize text-muted-foreground">{key}</span>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${(value / totalCost) * 100}%` }} />
                      </div>
                      <span className="w-16 text-right text-sm font-medium tabular-nums">${value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-semibold text-foreground">Total</span>
                  <span className="text-sm font-bold tabular-nums text-foreground">${totalCost.toLocaleString()}/mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Immigration Programs */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">Immigration Programs</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {country.immigrationPrograms.map(prog => (
                <div key={prog.name} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-card-foreground">{prog.name}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium uppercase text-primary">{prog.type}</span>
                  </div>
                  <p className="mb-4 text-xs text-muted-foreground">Processing: {prog.processingTime}</p>
                  <div className="space-y-2">
                    {prog.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{i + 1}</div>
                        <p className="text-sm text-muted-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
