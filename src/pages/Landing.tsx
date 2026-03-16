import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, BarChart3, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountryCard } from "@/components/CountryCard";
import { countries } from "@/data/countries";
import { useNavigate } from "react-router-dom";

const steps = [
  { icon: FileText, title: "Complete your profile", desc: "Tell us about your career, budget, and lifestyle preferences." },
  { icon: Sparkles, title: "Get recommendations", desc: "Our algorithm matches you with the best countries for your situation." },
  { icon: BarChart3, title: "Explore & compare", desc: "Dive into visa pathways, cost of living, and immigration programs." },
];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_70%)]" />
        <div className="container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3 text-primary" strokeWidth={1.5} />
              Data-driven relocation for the global workforce
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Find the Best Country<br />
              <span className="gradient-text">to Move To</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              Complete your relocation profile and get personalized country recommendations based on career opportunities, cost of living, and immigration pathways.
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/assessment">
                <Button size="lg" className="gap-2">
                  Start Assessment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline">
                  Explore Countries
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground">How it works</h2>
          <p className="text-muted-foreground">Three steps to your next chapter</p>
        </motion.div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Step {i + 1}</p>
              <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular destinations */}
      <section className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Popular Destinations</h2>
            <p className="text-muted-foreground">Where global professionals are relocating in 2026</p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {countries.slice(0, 6).map((c, i) => (
              <CountryCard
                key={c.id}
                country={c}
                index={i}
                onViewDetails={() => navigate(`/country/${c.id}`)}
                onCompare={() => navigate("/compare")}
                onSave={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-10 text-center shadow-card"
        >
          <h2 className="mb-3 text-2xl font-bold text-foreground">Ready to plan your relocation?</h2>
          <p className="mb-6 text-muted-foreground">
            74% of software engineers in Lisbon report a higher quality of life than in London. Find your ideal destination.
          </p>
          <Link to="/assessment">
            <Button size="lg" className="gap-2">
              Start Free Assessment <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
