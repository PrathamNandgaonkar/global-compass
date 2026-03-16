import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const totalSteps = 5;

const stepLabels = ["Personal", "Career", "Budget", "Lifestyle", "Goals"];

export default function Assessment() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: 28, citizenship: "", education: "bachelors",
    profession: "", experience: 3, industry: "",
    savings: 20000, expectedSalary: 60000, costPreference: "moderate",
    climate: "temperate", setting: "urban", healthcareImportance: "high",
    visaType: "work", timeline: "6-12 months",
  });

  const update = (key: string, value: string | number) => setForm(prev => ({ ...prev, [key]: value }));

  const next = () => {
    if (step < totalSteps - 1) setStep(s => s + 1);
    else navigate("/results");
  };
  const back = () => setStep(s => Math.max(0, s - 1));

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen">
      {/* Progress bar */}
      <div className="fixed left-0 top-14 z-40 h-0.5 w-full bg-muted">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ ease: [0.16, 1, 0.3, 1] }} />
      </div>

      <div className="container mx-auto flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Step indicator */}
          <div className="mb-8 flex justify-center gap-2">
            {stepLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => i <= step && setStep(i)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  i === step ? "bg-primary text-primary-foreground" :
                  i < step ? "bg-primary/10 text-primary" :
                  "bg-muted text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-border bg-card p-8 shadow-card"
            >
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
                  <p className="text-sm text-muted-foreground">Tell us about yourself to personalize your recommendations.</p>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Age</Label>
                      <Input type="number" value={form.age} onChange={e => update("age", +e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Citizenship</Label>
                      <Input placeholder="e.g. United States" value={form.citizenship} onChange={e => update("citizenship", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Education Level</Label>
                      <Select value={form.education} onValueChange={v => update("education", v)}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="highschool">High School</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-foreground">Career Details</h2>
                  <p className="text-sm text-muted-foreground">Your profession helps us match visa eligibility and job markets.</p>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Profession</Label>
                      <Input placeholder="e.g. Software Engineer" value={form.profession} onChange={e => update("profession", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Years of Experience</Label>
                      <div className="mt-2">
                        <Slider value={[form.experience]} onValueChange={v => update("experience", v[0])} min={0} max={20} step={1} />
                        <p className="mt-1 text-sm tabular-nums text-muted-foreground">{form.experience} years</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Industry</Label>
                      <Select value={form.industry} onValueChange={v => update("industry", v)}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Select industry" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-foreground">Budget & Finances</h2>
                  <p className="text-sm text-muted-foreground">We'll match you with countries that fit your financial situation.</p>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Current Savings (USD)</Label>
                      <Input type="number" value={form.savings} onChange={e => update("savings", +e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Expected Annual Salary (USD)</Label>
                      <Input type="number" value={form.expectedSalary} onChange={e => update("expectedSalary", +e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Cost of Living Preference</Label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {["frugal", "moderate", "luxury"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => update("costPreference", opt)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                              form.costPreference === opt ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-foreground">Lifestyle Preferences</h2>
                  <p className="text-sm text-muted-foreground">Find a place that matches your ideal lifestyle.</p>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Climate</Label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {["tropical", "temperate", "continental", "mediterranean"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => update("climate", opt)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                              form.climate === opt ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Setting</Label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {["urban", "suburban", "rural", "coastal"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => update("setting", opt)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                              form.setting === opt ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Healthcare Importance</Label>
                      <Select value={form.healthcareImportance} onValueChange={v => update("healthcareImportance", v)}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Nice to have</SelectItem>
                          <SelectItem value="medium">Important</SelectItem>
                          <SelectItem value="high">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-foreground">Your Goals</h2>
                  <p className="text-sm text-muted-foreground">What are you looking for in your relocation?</p>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Primary Visa Goal</Label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {[{v:"work",l:"Work Visa"},{v:"pr",l:"Permanent Residency"},{v:"student",l:"Study Abroad"}].map(opt => (
                          <button
                            key={opt.v}
                            onClick={() => update("visaType", opt.v)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                              form.visaType === opt.v ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                            }`}
                          >
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Timeline</Label>
                      <Select value={form.timeline} onValueChange={v => update("timeline", v)}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-6 months">0-6 months</SelectItem>
                          <SelectItem value="6-12 months">6-12 months</SelectItem>
                          <SelectItem value="1-2 years">1-2 years</SelectItem>
                          <SelectItem value="2+ years">2+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={back} disabled={step === 0}>Back</Button>
                <Button onClick={next}>
                  {step === totalSteps - 1 ? "Analyze & Show Results" : `Continue to ${stepLabels[step + 1]}`}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
