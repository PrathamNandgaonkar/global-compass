import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

// ---- Types ----
interface FormState {
  intent: string;
  environment: string;
  scenery: string;
  budget: string;
  priorities: string[];
  workStyle: string;
  lifeSituation: string;
}

interface OptionCardProps {
  emoji: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  description?: string;
}

// ---- Reusable Components ----

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="fixed left-0 top-14 z-40 h-1 w-full bg-muted">
      <motion.div
        className="h-full bg-primary rounded-r-full"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <p className="text-xs font-medium text-muted-foreground tracking-wide">
      Step {current + 1} of {total}
    </p>
  );
}

function OptionCard({ emoji, label, selected, onClick, description }: OptionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-5 text-center transition-all duration-200 cursor-pointer ${
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
      }`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {description && (
        <span className="text-xs text-muted-foreground leading-relaxed">{description}</span>
      )}
      {selected && (
        <motion.div
          layoutId="selection-ring"
          className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}

function PillOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border ${
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-md"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
    </motion.button>
  );
}

// ---- Steps Data ----
const STEPS = [
  {
    title: "What brings you here today?",
    subtitle: "Let's start with your main motivation",
    microcopy: "This helps us find better matches ✨",
  },
  {
    title: "Which environment feels like you?",
    subtitle: "Think about where you feel most alive",
    microcopy: "No wrong answers here 🌎",
  },
  {
    title: "What would you love to see outside your window?",
    subtitle: "Dream a little — we'll make it real",
    microcopy: "Nice choice 👀",
  },
  {
    title: "What's your monthly budget?",
    subtitle: "This helps us filter realistic options",
    microcopy: "We'll find great options in your range 💰",
  },
  {
    title: "What matters most to you?",
    subtitle: "Pick up to 3 priorities",
    microcopy: "Almost there… 🎯",
  },
  {
    title: "How do you work?",
    subtitle: "Your work style shapes your visa options",
    microcopy: "This unlocks the right visa pathways 🚀",
  },
  {
    title: "What's your life situation?",
    subtitle: "Family matters for visa & cost planning",
    microcopy: "Last one, we promise! 🎉",
  },
] as const;

const TOTAL_STEPS = STEPS.length + 1; // +1 for summary

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    intent: "",
    environment: "",
    scenery: "",
    budget: "",
    priorities: [],
    workStyle: "",
    lifeSituation: "",
  });

  const goNext = useCallback(() => {
    setDirection(1);
    setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep(s => Math.max(0, s - 1));
  }, []);

  const selectSingle = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setTimeout(goNext, 400);
  };

  const togglePriority = (value: string) => {
    setForm(prev => {
      const current = prev.priorities;
      if (current.includes(value)) {
        return { ...prev, priorities: current.filter(p => p !== value) };
      }
      if (current.length >= 3) return prev;
      return { ...prev, priorities: [...current, value] };
    });
  };

  const getSummaryText = () => {
    const parts: string[] = [];
    if (form.environment) {
      const envMap: Record<string, string> = { calm: "calm & coastal", city: "fast-paced urban", nature: "nature-focused", cultural: "cultural & walkable" };
      parts.push(envMap[form.environment] || form.environment);
    }
    if (form.workStyle) parts.push(`${form.workStyle}-friendly`);
    if (form.budget) parts.push(`within ${form.budget}/mo`);
    return parts.length > 0
      ? `You prefer ${parts.join(", ")} countries`
      : "Complete the quiz to get personalized recommendations";
  };

  const canProceed = () => {
    switch (step) {
      case 4: return form.priorities.length > 0;
      default: return true;
    }
  };

  const isSummary = step === TOTAL_STEPS - 1;

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar current={step} total={TOTAL_STEPS} />

      <div className="container mx-auto flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          {/* Back + step indicator */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <StepIndicator current={step} total={TOTAL_STEPS} />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Step 1: Intent */}
              {step === 0 && (
                <StepWrapper title={STEPS[0].title} subtitle={STEPS[0].subtitle} microcopy={STEPS[0].microcopy}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { emoji: "🌍", label: "Work remotely", value: "remote" },
                      { emoji: "💼", label: "Build a career abroad", value: "career" },
                      { emoji: "🎓", label: "Study abroad", value: "study" },
                      { emoji: "👨‍👩‍👧", label: "Move with family", value: "family" },
                      { emoji: "💰", label: "Improve lifestyle / taxes", value: "lifestyle" },
                    ].map(opt => (
                      <OptionCard
                        key={opt.value}
                        emoji={opt.emoji}
                        label={opt.label}
                        selected={form.intent === opt.value}
                        onClick={() => selectSingle("intent", opt.value)}
                      />
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 2: Environment */}
              {step === 1 && (
                <StepWrapper title={STEPS[1].title} subtitle={STEPS[1].subtitle} microcopy={form.environment ? STEPS[1].microcopy : undefined}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { emoji: "🌊", label: "Calm & near water", value: "calm" },
                      { emoji: "🌆", label: "Fast-paced city", value: "city" },
                      { emoji: "🌿", label: "Quiet & nature", value: "nature" },
                      { emoji: "☕", label: "Cultural & walkable", value: "cultural" },
                    ].map(opt => (
                      <OptionCard
                        key={opt.value}
                        emoji={opt.emoji}
                        label={opt.label}
                        selected={form.environment === opt.value}
                        onClick={() => selectSingle("environment", opt.value)}
                      />
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 3: Scenery */}
              {step === 2 && (
                <StepWrapper title={STEPS[2].title} subtitle={STEPS[2].subtitle} microcopy={form.scenery ? STEPS[2].microcopy : undefined}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { emoji: "🏖️", label: "Beaches", value: "beaches" },
                      { emoji: "🌆", label: "Skyline", value: "skyline" },
                      { emoji: "🏔️", label: "Mountains", value: "mountains" },
                      { emoji: "🏛️", label: "Old streets", value: "old-streets" },
                    ].map(opt => (
                      <OptionCard
                        key={opt.value}
                        emoji={opt.emoji}
                        label={opt.label}
                        selected={form.scenery === opt.value}
                        onClick={() => selectSingle("scenery", opt.value)}
                      />
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 4: Budget */}
              {step === 3 && (
                <StepWrapper title={STEPS[3].title} subtitle={STEPS[3].subtitle} microcopy={form.budget ? STEPS[3].microcopy : undefined}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { emoji: "🪙", label: "Under $1,500", value: "Under $1500" },
                      { emoji: "💵", label: "$1,500 – $3,000", value: "$1500–3000" },
                      { emoji: "💰", label: "$3,000 – $5,000", value: "$3000–5000" },
                      { emoji: "💎", label: "$5,000+", value: "$5000+" },
                    ].map(opt => (
                      <OptionCard
                        key={opt.value}
                        emoji={opt.emoji}
                        label={opt.label}
                        selected={form.budget === opt.value}
                        onClick={() => selectSingle("budget", opt.value)}
                      />
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 5: Priorities (multi-select) */}
              {step === 4 && (
                <StepWrapper title={STEPS[4].title} subtitle={STEPS[4].subtitle} microcopy={form.priorities.length > 0 ? STEPS[4].microcopy : undefined}>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      "🛡 Safety",
                      "💸 Low tax",
                      "🚀 Career growth",
                      "🌍 Easy visa",
                      "🧘 Work-life balance",
                      "🌐 Fast internet",
                      "🏥 Healthcare",
                      "🎭 Culture & nightlife",
                    ].map(label => (
                      <PillOption
                        key={label}
                        label={label}
                        selected={form.priorities.includes(label)}
                        onClick={() => togglePriority(label)}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    {form.priorities.length}/3 selected
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button onClick={goNext} disabled={!canProceed()} size="lg">
                      Continue
                    </Button>
                  </div>
                </StepWrapper>
              )}

              {/* Step 6: Work Style */}
              {step === 5 && (
                <StepWrapper title={STEPS[5].title} subtitle={STEPS[5].subtitle} microcopy={form.workStyle ? STEPS[5].microcopy : undefined}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { emoji: "🏠", label: "Remote", value: "remote" },
                      { emoji: "🏢", label: "Local job", value: "local" },
                      { emoji: "✏️", label: "Freelance", value: "freelance" },
                      { emoji: "🏗️", label: "Business", value: "business" },
                    ].map(opt => (
                      <OptionCard
                        key={opt.value}
                        emoji={opt.emoji}
                        label={opt.label}
                        selected={form.workStyle === opt.value}
                        onClick={() => selectSingle("workStyle", opt.value)}
                      />
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 7: Life Situation */}
              {step === 6 && (
                <StepWrapper title={STEPS[6].title} subtitle={STEPS[6].subtitle} microcopy={form.lifeSituation ? STEPS[6].microcopy : undefined}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { emoji: "🧍", label: "Single", value: "single" },
                      { emoji: "👫", label: "Couple", value: "couple" },
                      { emoji: "👨‍👩‍👧‍👦", label: "Family with kids", value: "family" },
                    ].map(opt => (
                      <OptionCard
                        key={opt.value}
                        emoji={opt.emoji}
                        label={opt.label}
                        selected={form.lifeSituation === opt.value}
                        onClick={() => selectSingle("lifeSituation", opt.value)}
                      />
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 8: Summary */}
              {isSummary && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
                  >
                    <Sparkles className="w-8 h-8 text-primary" />
                  </motion.div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Your profile is ready!</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                      {getSummaryText()}
                    </p>
                  </div>

                  {/* Summary chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {form.intent && (
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {form.intent}
                      </span>
                    )}
                    {form.budget && (
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {form.budget}
                      </span>
                    )}
                    {form.workStyle && (
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {form.workStyle}
                      </span>
                    )}
                    {form.lifeSituation && (
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {form.lifeSituation}
                      </span>
                    )}
                    {form.priorities.map(p => (
                      <span key={p} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                        {p}
                      </span>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    onClick={() => navigate("/results")}
                    className="gap-2 text-base px-8"
                  >
                    <Sparkles className="w-4 h-4" />
                    Show my best countries
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ---- Step Wrapper ----
function StepWrapper({
  title,
  subtitle,
  microcopy,
  children,
}: {
  title: string;
  subtitle: string;
  microcopy?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {children}
      <AnimatePresence>
        {microcopy && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground text-center"
          >
            {microcopy}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
