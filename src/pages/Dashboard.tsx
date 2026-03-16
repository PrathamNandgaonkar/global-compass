import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Bookmark, GitCompare, ClipboardList, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountryCard } from "@/components/CountryCard";
import { countries } from "@/data/countries";
import { toast } from "sonner";

const savedCountries = countries.slice(0, 3);
const recommendedCountries = countries.slice(3, 6);

const sections = [
  { icon: Bookmark, title: "Saved Countries", count: 3 },
  { icon: GitCompare, title: "Comparison Lists", count: 1 },
  { icon: ClipboardList, title: "Assessment History", count: 2 },
  { icon: Sparkles, title: "Recommendations", count: 6 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mb-8 text-muted-foreground">Your relocation planning hub</p>

          {/* Quick stats */}
          <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <s.icon className="mb-2 h-5 w-5 text-primary" strokeWidth={1.5} />
                <p className="text-2xl font-bold tabular-nums text-card-foreground">{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Saved */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Saved Countries</h2>
              <Link to="/explore">
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                  View all <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {savedCountries.map((c, i) => (
                <CountryCard
                  key={c.id}
                  country={c}
                  index={i}
                  onViewDetails={() => navigate(`/country/${c.id}`)}
                  onCompare={() => navigate("/compare")}
                  onSave={() => toast.info(`${c.name} already saved`)}
                />
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
              <Link to="/results">
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                  View all <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedCountries.map((c, i) => (
                <CountryCard
                  key={c.id}
                  country={c}
                  index={i}
                  onViewDetails={() => navigate(`/country/${c.id}`)}
                  onCompare={() => navigate("/compare")}
                  onSave={() => toast.success(`${c.name} saved!`)}
                />
              ))}
            </div>
          </div>

          {/* Assessment History */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">Assessment History</h2>
            <div className="space-y-3">
              {[
                { date: "March 14, 2026", focus: "Tech Career - Europe", top: "Germany" },
                { date: "March 10, 2026", focus: "Remote Work - Global", top: "Portugal" },
              ].map(a => (
                <div key={a.date} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{a.focus}</p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Top match</p>
                    <p className="text-sm font-medium text-primary">{a.top}</p>
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
