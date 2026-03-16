import { motion } from "framer-motion";
import { Database, RefreshCw, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";

const crawlerLogs = [
  { source: "OECD Data", status: "success", time: "2 hours ago", records: 1247 },
  { source: "UN Migration DB", status: "success", time: "4 hours ago", records: 892 },
  { source: "World Bank API", status: "warning", time: "12 hours ago", records: 456 },
  { source: "Numbeo Scraper", status: "error", time: "1 day ago", records: 0 },
];

export default function Admin() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-1 text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground">Manage country data and immigration programs</p>
            </div>
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh Data
            </Button>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Countries", value: countries.length, icon: Database },
              { label: "Programs", value: countries.reduce((a, c) => a + c.immigrationPrograms.length, 0), icon: CheckCircle },
              { label: "Data Sources", value: 4, icon: RefreshCw },
              { label: "Last Update", value: "2h ago", icon: Clock },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <s.icon className="mb-2 h-5 w-5 text-primary" strokeWidth={1.5} />
                <p className="text-2xl font-bold tabular-nums text-card-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Country database table */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">Country Database</h2>
            <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Country", "Region", "Score", "Salary", "CoL Index", "Programs", "Status"].map(h => (
                      <th key={h} className="p-3 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {countries.map((c, i) => (
                    <tr key={c.id} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="p-3 text-sm font-medium text-card-foreground">
                        <span className="mr-2">{c.flag}</span>{c.name}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{c.region}</td>
                      <td className="p-3 text-sm font-medium tabular-nums text-primary">{c.score}%</td>
                      <td className="p-3 text-sm tabular-nums text-card-foreground">${c.salary.toLocaleString()}</td>
                      <td className="p-3 text-sm tabular-nums text-card-foreground">{c.costOfLiving}</td>
                      <td className="p-3 text-sm tabular-nums text-card-foreground">{c.immigrationPrograms.length}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                          <CheckCircle className="h-3 w-3" /> Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Crawler status */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">Data Crawler Status</h2>
            <div className="space-y-3">
              {crawlerLogs.map(log => (
                <div key={log.source} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card">
                  <div className="flex items-center gap-3">
                    {log.status === "success" && <CheckCircle className="h-4 w-4 text-success" />}
                    {log.status === "warning" && <AlertCircle className="h-4 w-4 text-warning" />}
                    {log.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{log.source}</p>
                      <p className="text-xs text-muted-foreground">{log.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium tabular-nums text-card-foreground">{log.records.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">records</p>
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
