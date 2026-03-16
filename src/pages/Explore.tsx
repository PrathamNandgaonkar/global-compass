import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CountryCard } from "@/components/CountryCard";
import { countries } from "@/data/countries";
import { toast } from "sonner";

export default function Explore() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");

  const regions = ["all", ...new Set(countries.map(c => c.region))];
  const filtered = countries.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === "all" || c.region === regionFilter;
    return matchSearch && matchRegion;
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Explore Countries</h1>
          <p className="mb-8 text-muted-foreground">Discover destinations that match your profile</p>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <Input
                placeholder="Search countries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                    regionFilter === r ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
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
        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No countries match your search.</p>
        )}
      </div>
    </div>
  );
}
