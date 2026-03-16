import { motion } from "framer-motion";
import { countries } from "@/data/countries";

export default function VisaPathways() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Visa Pathways</h1>
          <p className="mb-10 text-muted-foreground">Step-by-step immigration program timelines</p>
        </motion.div>

        <div className="space-y-10">
          {countries.map((country, ci) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.05 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{country.flag}</span>
                <h2 className="text-xl font-bold text-foreground">{country.name}</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {country.immigrationPrograms.map(prog => (
                  <div key={prog.name} className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold text-card-foreground">{prog.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium uppercase text-primary">{prog.type}</span>
                        <span className="text-xs text-muted-foreground">{prog.processingTime}</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-6">
                      <div className="absolute left-2 top-1 h-[calc(100%-8px)] w-px bg-border" />
                      {prog.steps.map((step, i) => (
                        <div key={i} className="relative mb-4 last:mb-0">
                          <div className="absolute -left-4 top-1 h-3 w-3 rounded-full border-2 border-primary bg-card" />
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Step {i + 1}</p>
                          <p className="text-sm text-card-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
