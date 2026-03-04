import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  IndianRupee,
  Target,
  Shield,
  Home,
  GraduationCap,
  Baby,
  Sparkles,
} from "lucide-react";

interface UserData {
  monthlyIncome: string;
  monthlyExpenses: string;
  emi: string;
  riskAppetite: string;
  goals: string[];
  timeline: number;
}

const goalOptions = [
  { id: "retirement", label: "Retirement", icon: Shield },
  { id: "house", label: "Buy a House", icon: Home },
  { id: "wealth", label: "Wealth Creation", icon: TrendingUp },
  { id: "education", label: "Child Education", icon: Baby },
  { id: "higherEd", label: "Higher Education", icon: GraduationCap },
  { id: "travel", label: "Travel & Leisure", icon: Target },
];

const steps = [
  "Income",
  "Expenses",
  "Risk",
  "Goals",
  "Timeline",
  "Ready",
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    monthlyIncome: "",
    monthlyExpenses: "",
    emi: "",
    riskAppetite: "",
    goals: [],
    timeline: 5,
  });

  const progress = ((step + 1) / steps.length) * 100;

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleComplete = () => {
    localStorage.setItem("finsage_user", JSON.stringify(userData));
    navigate("/app");
  };

  const toggleGoal = (goalId: string) => {
    setUserData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const variants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "#0F172A", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: "500px", height: "500px", top: "-150px", right: "-100px",
            background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "400px", height: "400px", bottom: "-100px", left: "-80px",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
          >
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="text-white" style={{ fontWeight: 700, fontSize: "1.1rem" }}>FinSage</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: i <= step ? "#10B981" : "rgba(255,255,255,0.1)",
                    border: i === step ? "2px solid #10B981" : "none",
                    boxShadow: i === step ? "0 0 12px rgba(16,185,129,0.5)" : "none",
                  }}
                >
                  {i < step ? (
                    <CheckCircle2 size={14} className="text-white" />
                  ) : (
                    <span className="text-white" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                      {i + 1}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #10B981, #059669)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
          <div className="text-right mt-2">
            <span className="text-slate-500" style={{ fontSize: "0.75rem" }}>
              Step {step + 1} of {steps.length}
            </span>
          </div>
        </div>

        {/* AI Assistant */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #10B981, #3B82F6)", boxShadow: "0 0 20px rgba(16,185,129,0.3)" }}
          >
            <Sparkles size={18} className="text-white" />
          </div>
          <div
            className="px-4 py-2 rounded-2xl rounded-tl-sm"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <span className="text-slate-300" style={{ fontSize: "0.85rem" }}>
              {step === 0 && "Hi! I'm Sage, your AI financial guide. Let's start with your income."}
              {step === 1 && "Great! Now let's understand your monthly spending."}
              {step === 2 && "How comfortable are you with investment risk?"}
              {step === 3 && "What are you investing towards? Select all that apply."}
              {step === 4 && "How long can you invest before needing the money?"}
              {step === 5 && "You're all set! I've analyzed your profile. Let's start growing your wealth! 🎉"}
            </span>
          </div>
        </motion.div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-8"
            >
              {/* Step 0: Monthly Income */}
              {step === 0 && (
                <div>
                  <h2 className="text-white mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                    Monthly Income
                  </h2>
                  <p className="text-slate-400 mb-6" style={{ fontSize: "0.9rem" }}>
                    Your total take-home salary after all deductions.
                  </p>
                  <div className="relative">
                    <div
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg"
                      style={{ background: "rgba(16,185,129,0.15)" }}
                    >
                      <IndianRupee size={16} className="text-[#10B981]" />
                    </div>
                    <input
                      type="number"
                      placeholder="e.g. 85000"
                      value={userData.monthlyIncome}
                      onChange={(e) => setUserData({ ...userData, monthlyIncome: e.target.value })}
                      className="w-full pl-14 pr-4 py-4 rounded-xl text-white placeholder-slate-600 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        fontSize: "1.1rem",
                        fontVariantNumeric: "tabular-nums",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                  <p className="text-slate-600 mt-2" style={{ fontSize: "0.78rem" }}>
                    This helps us understand your financial capacity and suggest appropriate investments.
                  </p>
                </div>
              )}

              {/* Step 1: Expenses + EMI */}
              {step === 1 && (
                <div>
                  <h2 className="text-white mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                    Monthly Outflows
                  </h2>
                  <p className="text-slate-400 mb-6" style={{ fontSize: "0.9rem" }}>
                    Include rent, groceries, utilities, and all regular expenses.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-400 mb-2 block" style={{ fontSize: "0.82rem" }}>
                        Monthly Expenses
                      </label>
                      <div className="relative">
                        <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#10B981]" />
                        <input
                          type="number"
                          placeholder="e.g. 42000"
                          value={userData.monthlyExpenses}
                          onChange={(e) => setUserData({ ...userData, monthlyExpenses: e.target.value })}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl text-white placeholder-slate-600 outline-none"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            fontSize: "1rem",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-400 mb-2 block" style={{ fontSize: "0.82rem" }}>
                        Monthly EMI (Home, Car, Personal Loan)
                      </label>
                      <div className="relative">
                        <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#10B981]" />
                        <input
                          type="number"
                          placeholder="e.g. 15000 (0 if none)"
                          value={userData.emi}
                          onChange={(e) => setUserData({ ...userData, emi: e.target.value })}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl text-white placeholder-slate-600 outline-none"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            fontSize: "1rem",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Risk Appetite */}
              {step === 2 && (
                <div>
                  <h2 className="text-white mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                    Risk Appetite
                  </h2>
                  <p className="text-slate-400 mb-6" style={{ fontSize: "0.9rem" }}>
                    How do you feel about market ups and downs?
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        id: "conservative",
                        label: "Conservative",
                        desc: "I prefer stability. Low risk, steady returns.",
                        color: "#10B981",
                      },
                      {
                        id: "balanced",
                        label: "Balanced",
                        desc: "Mix of safety and growth. I can handle some volatility.",
                        color: "#3B82F6",
                      },
                      {
                        id: "growth",
                        label: "Growth",
                        desc: "I want maximum returns. I'm okay with higher risk.",
                        color: "#F59E0B",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setUserData({ ...userData, riskAppetite: option.id })}
                        className="w-full p-4 rounded-xl text-left transition-all duration-200"
                        style={{
                          background:
                            userData.riskAppetite === option.id
                              ? `${option.color}18`
                              : "rgba(255,255,255,0.04)",
                          border:
                            userData.riskAppetite === option.id
                              ? `1.5px solid ${option.color}60`
                              : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                            style={{
                              borderColor: userData.riskAppetite === option.id ? option.color : "rgba(255,255,255,0.2)",
                              background: userData.riskAppetite === option.id ? option.color : "transparent",
                            }}
                          >
                            {userData.riskAppetite === option.id && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <div>
                            <div className="text-white" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                              {option.label}
                            </div>
                            <div className="text-slate-500" style={{ fontSize: "0.8rem" }}>
                              {option.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Goals */}
              {step === 3 && (
                <div>
                  <h2 className="text-white mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                    Investment Goals
                  </h2>
                  <p className="text-slate-400 mb-6" style={{ fontSize: "0.9rem" }}>
                    Select all that apply. This helps personalise your plan.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {goalOptions.map((goal) => {
                      const isSelected = userData.goals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className="p-4 rounded-xl text-left transition-all duration-200"
                          style={{
                            background: isSelected ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)",
                            border: isSelected ? "1.5px solid rgba(16,185,129,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <goal.icon
                            size={20}
                            className="mb-2"
                            style={{ color: isSelected ? "#10B981" : "#94a3b8" }}
                          />
                          <div
                            className="text-white"
                            style={{ fontSize: "0.85rem", fontWeight: isSelected ? 600 : 400 }}
                          >
                            {goal.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Timeline */}
              {step === 4 && (
                <div>
                  <h2 className="text-white mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                    Investment Timeline
                  </h2>
                  <p className="text-slate-400 mb-8" style={{ fontSize: "0.9rem" }}>
                    How long can you stay invested before needing this money?
                  </p>
                  <div className="text-center mb-8">
                    <div
                      className="text-white mb-1"
                      style={{ fontSize: "3rem", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}
                    >
                      {userData.timeline}
                    </div>
                    <div className="text-slate-400" style={{ fontSize: "0.9rem" }}>
                      {userData.timeline === 1 ? "year" : "years"}
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    step={1}
                    value={userData.timeline}
                    onChange={(e) => setUserData({ ...userData, timeline: parseInt(e.target.value) })}
                    className="w-full accent-emerald-500"
                    style={{ accentColor: "#10B981" }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-slate-600" style={{ fontSize: "0.75rem" }}>1 year</span>
                    <span className="text-slate-600" style={{ fontSize: "0.75rem" }}>15+ years</span>
                  </div>
                  <div className="mt-6 flex gap-2 flex-wrap">
                    {[
                      { val: 1, label: "Short Term" },
                      { val: 5, label: "Medium Term" },
                      { val: 10, label: "Long Term" },
                      { val: 15, label: "Very Long" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setUserData({ ...userData, timeline: opt.val })}
                        className="px-3 py-1.5 rounded-lg transition-all duration-200"
                        style={{
                          background: userData.timeline === opt.val ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)",
                          border: userData.timeline === opt.val ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.1)",
                          color: userData.timeline === opt.val ? "#10B981" : "#94a3b8",
                          fontSize: "0.78rem",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Complete */}
              {step === 5 && (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 0 40px rgba(16,185,129,0.4)" }}
                  >
                    <CheckCircle2 size={36} className="text-white" />
                  </motion.div>
                  <h2 className="text-white mb-3" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    Profile Complete!
                  </h2>
                  <p className="text-slate-400 mb-6" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Based on your inputs, I've prepared a personalized financial plan. Let's explore your dashboard.
                  </p>
                  <div className="space-y-2 text-left mb-6">
                    {[
                      `Monthly surplus: ₹${Math.max(0, parseInt(userData.monthlyIncome || "85000") - parseInt(userData.monthlyExpenses || "42000") - parseInt(userData.emi || "17000")).toLocaleString("en-IN")}`,
                      `Risk profile: ${userData.riskAppetite || "Balanced"}`,
                      `Investment horizon: ${userData.timeline} years`,
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg"
                        style={{ background: "rgba(16,185,129,0.08)" }}
                      >
                        <CheckCircle2 size={14} className="text-[#10B981]" />
                        <span className="text-slate-300" style={{ fontSize: "0.85rem" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="px-8 pb-8 flex gap-3">
            {step > 0 && step < 5 && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-slate-400 hover:text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            {step < 5 && (
              <button
                onClick={goNext}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #10B981, #059669)", fontWeight: 600 }}
              >
                Continue
                <ArrowRight size={16} />
              </button>
            )}
            {step === 5 && (
              <button
                onClick={handleComplete}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  fontWeight: 600,
                  boxShadow: "0 0 24px rgba(16,185,129,0.4)",
                }}
              >
                Go to My Dashboard
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
