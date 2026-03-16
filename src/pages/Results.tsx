import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { CountryCard } from "@/components/CountryCard";
import { countries } from "@/data/countries";
import { toast } from "sonner";

export default function Results() {
  const navigate = useNavigate();
  const sorted = [...countries].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Trophy className="h-3 w-3 text-primary" strokeWidth={1.5} />
            Assessment Complete
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Your Top Matches</h1>
          <p className="text-muted-foreground">Countries ranked by compatibility with your profile</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((c, i) => (
            <CountryCard
              key={c.id}
              country={c}
              index={i}
              onViewDetails={() => navigate(`/country/${c.id}`)}
              onCompare={() => navigate("/compare")}
              onSave={() => toast.success(`${c.name} saved to dashboard`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
