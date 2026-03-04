import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  TrendingUp,
  BarChart3,
  Coins,
  X,
  AlertTriangle,
  Info,
} from "lucide-react";

const allocationData = [
  { name: "Emergency Fund", value: 15, color: "#F59E0B", amount: 3750 },
  { name: "SIP Large Cap", value: 30, color: "#10B981", amount: 7500 },
  { name: "SIP Mid Cap", value: 20, color: "#3B82F6", amount: 5000 },
  { name: "Index Fund", value: 25, color: "#8B5CF6", amount: 6250 },
  { name: "Gold ETF", value: 10, color: "#F97316", amount: 2500 },
];

interface Investment {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  monthlyAmount: number;
  risk: "Low" | "Medium" | "High";
  riskColor: string;
  reason: string;
  eli5: string;
  returns: string;
  type: string;
}

const investments: Investment[] = [
  {
    id: "emergency",
    name: "Emergency Fund",
    icon: Shield,
    color: "#F59E0B",
    monthlyAmount: 3750,
    risk: "Low",
    riskColor: "#10B981",
    reason:
      "Before any investment, you need a safety net. Based on your ₹85K income, we recommend building 6 months of expenses (₹5.1L). You currently have ₹1.5L — let's close this gap first.",
    eli5:
      "Imagine you lose your job suddenly. Your emergency fund keeps you afloat for 6 months without stress. Always build this before investing!",
    returns: "3.5% – 4.5% (Liquid Fund / HY Savings)",
    type: "Safety Net",
  },
  {
    id: "largecap",
    name: "SIP – Large Cap Fund",
    icon: TrendingUp,
    color: "#10B981",
    monthlyAmount: 7500,
    risk: "Medium",
    riskColor: "#3B82F6",
    reason:
      "Large cap funds invest in India's top 100 companies. With your Balanced risk profile, they offer steady growth with lower volatility. Ideal for your 10-year horizon.",
    eli5:
      "Think of it like betting on India's biggest, strongest companies — like Reliance, TCS, Infosys. They don't grow crazy fast, but they're rock solid.",
    returns: "11% – 13% (10-year avg CAGR)",
    type: "Equity Fund",
  },
  {
    id: "midcap",
    name: "SIP – Mid Cap Fund",
    icon: BarChart3,
    color: "#3B82F6",
    monthlyAmount: 5000,
    risk: "High",
    riskColor: "#F59E0B",
    reason:
      "Mid cap funds have higher growth potential for your long-term goals. With a 10-year horizon and balanced risk appetite, a 20% allocation adds growth without overexposure.",
    eli5:
      "These are companies that are already successful but still growing fast — like future TCSes. Higher risk, but potentially way bigger rewards over time.",
    returns: "13% – 16% (10-year avg CAGR)",
    type: "Equity Fund",
  },
  {
    id: "index",
    name: "Nifty 50 Index Fund",
    icon: BarChart3,
    color: "#8B5CF6",
    monthlyAmount: 6250,
    risk: "Medium",
    riskColor: "#3B82F6",
    reason:
      "Index funds track NIFTY 50 with ultra-low expense ratios. Research shows most actively managed funds underperform the index over 10+ years. This is your low-cost core holding.",
    eli5:
      "Instead of picking one stock, you buy a tiny piece of all 50 top Indian companies at once. Very low fees, very simple, very effective long-term.",
    returns: "10% – 12% (tracks NIFTY 50)",
    type: "Passive Fund",
  },
  {
    id: "gold",
    name: "Gold ETF",
    icon: Coins,
    color: "#F97316",
    monthlyAmount: 2500,
    risk: "Low",
    riskColor: "#10B981",
    reason:
      "Gold acts as a hedge against market crashes and rupee depreciation. A 10% allocation provides portfolio stability and reduces correlation with equity markets during downturns.",
    eli5:
      "Gold doesn't grow fast, but when stock markets crash, gold usually goes up. It's your portfolio's insurance policy. 10% is the sweet spot.",
    returns: "7% – 9% (long-term average)",
    type: "Commodity",
  },
];

function CrashSimulatorModal({ onClose }: { onClose: () => void }) {
  const scenarios = [
    { label: "Mild correction (-15%)", equity: -15, gold: +5, overall: -10 },
    { label: "2008-style crash (-50%)", equity: -50, gold: +25, overall: -32 },
    { label: "COVID crash (-38%)", equity: -38, gold: +18, overall: -24 },
  ];
  const [selected, setSelected] = useState(0);
  const sc = scenarios[selected];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl p-6"
        style={{
          background: "#fff",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.12)" }}
            >
              <AlertTriangle size={20} style={{ color: "#F59E0B" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A" }}>
                Market Crash Simulator
              </h3>
              <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Stay calm. Think long-term.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <X size={16} style={{ color: "#64748B" }} />
          </button>
        </div>

        <div className="flex gap-2 mb-5">
          {scenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="flex-1 py-2 px-1 rounded-xl transition-all duration-200"
              style={{
                background: selected === i ? "rgba(239,68,68,0.1)" : "#F8FAFC",
                border: selected === i ? "1.5px solid rgba(239,68,68,0.4)" : "1px solid #E2E8F0",
                fontSize: "0.7rem",
                fontWeight: selected === i ? 600 : 400,
                color: selected === i ? "#DC2626" : "#64748B",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Your equity drops", value: `${sc.equity}%`, color: "#EF4444" },
            { label: "Gold moves", value: `+${sc.gold}%`, color: "#10B981" },
            { label: "Overall portfolio", value: `${sc.overall}%`, color: sc.overall < -20 ? "#EF4444" : "#F59E0B" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-2xl text-center"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: item.color }}>
                {item.value}
              </div>
              <div style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: "2px" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <div className="flex items-start gap-3">
            <Sparkles size={16} style={{ color: "#10B981", marginTop: "2px", flexShrink: 0 }} />
            <p style={{ fontSize: "0.85rem", color: "#1E293B", lineHeight: 1.6 }}>
              <strong>Remember:</strong> NIFTY 50 has recovered from every crash in its history —
              often reaching new highs within 2–3 years. SIP investors who stayed invested during
              2008 and COVID made{" "}
              <span style={{ color: "#10B981", fontWeight: 700 }}>exceptional returns</span> by
              simply doing nothing.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl text-white transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #10B981, #059669)",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          I'll stay the course 💪
        </button>
      </motion.div>
    </div>
  );
}

function InvestmentCard({
  inv,
  eli5Mode,
}: {
  inv: Investment;
  eli5Mode: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const riskLabels = { Low: 1, Medium: 2, High: 3 };

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full p-5 text-left flex items-center gap-4 hover:bg-slate-50/80 transition-colors duration-150"
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${inv.color}15` }}
        >
          <inv.icon size={22} style={{ color: inv.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
              {inv.name}
            </span>
            <span
              className="px-2 py-0.5 rounded-md"
              style={{ background: `${inv.color}15`, fontSize: "0.68rem", fontWeight: 600, color: inv.color }}
            >
              {inv.type}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>
              Monthly:{" "}
              <span style={{ fontWeight: 700, color: "#10B981" }}>
                ₹{inv.monthlyAmount.toLocaleString("en-IN")}
              </span>
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background:
                      dot <= riskLabels[inv.risk] ? inv.riskColor : "#E2E8F0",
                  }}
                />
              ))}
              <span style={{ fontSize: "0.72rem", color: inv.riskColor, fontWeight: 600 }}>
                {inv.risk}
              </span>
            </div>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={18} style={{ color: "#94a3b8", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={18} style={{ color: "#94a3b8", flexShrink: 0 }} />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-5 pb-5 pt-1"
              style={{ borderTop: "1px solid #F1F5F9" }}
            >
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#475569",
                  lineHeight: 1.65,
                  marginBottom: "12px",
                }}
              >
                {eli5Mode ? inv.eli5 : inv.reason}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}
                >
                  <Info size={12} style={{ color: "#3B82F6" }} />
                  <span style={{ fontSize: "0.75rem", color: "#3B82F6", fontWeight: 600 }}>
                    Expected: {inv.returns}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{ background: `${inv.riskColor}10`, border: `1px solid ${inv.riskColor}25` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: inv.riskColor }} />
                  <span style={{ fontSize: "0.75rem", color: inv.riskColor, fontWeight: 600 }}>
                    {inv.risk} Risk
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AdvisorPage() {
  const [eli5Mode, setEli5Mode] = useState(false);
  const [showCrashModal, setShowCrashModal] = useState(false);

  return (
    <div
      className="min-h-full p-4 md:p-6 max-w-2xl mx-auto"
      style={{ background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #10B981, #3B82F6)" }}
          >
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A" }}>
              AI Investment Advisor
            </h1>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Personalised plan based on your profile
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Toggles */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex gap-3 mb-5 flex-wrap"
      >
        {/* ELI5 Toggle */}
        <button
          onClick={() => setEli5Mode((m) => !m)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200"
          style={{
            background: eli5Mode
              ? "rgba(16,185,129,0.12)"
              : "#fff",
            border: eli5Mode
              ? "1.5px solid rgba(16,185,129,0.4)"
              : "1px solid #E2E8F0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="w-8 h-4 rounded-full relative transition-all duration-200"
            style={{
              background: eli5Mode ? "#10B981" : "#CBD5E1",
            }}
          >
            <div
              className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200"
              style={{ left: eli5Mode ? "18px" : "2px" }}
            />
          </div>
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: eli5Mode ? "#10B981" : "#64748B",
            }}
          >
            Explain Like I'm 5
          </span>
        </button>

        {/* Crash Simulator */}
        <button
          onClick={() => setShowCrashModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:bg-amber-50"
          style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <AlertTriangle size={15} style={{ color: "#F59E0B" }} />
          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#64748B" }}>
            What if market crashes?
          </span>
        </button>
      </motion.div>

      {/* Donut Chart + Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="rounded-2xl p-5 mb-5"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          border: "1px solid rgba(16,185,129,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex items-center gap-1 mb-4">
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>
            Recommended Allocation
          </span>
          <span
            className="ml-2 px-2 py-0.5 rounded-md"
            style={{ background: "rgba(16,185,129,0.2)", fontSize: "0.68rem", fontWeight: 600, color: "#10B981" }}
          >
            ₹25,000/mo
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div style={{ width: 140, height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={64}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {allocationData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  contentStyle={{
                    background: "#1E293B",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "0.78rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: item.color }}
                  />
                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "0.72rem", color: "#64748B" }}>
                    {item.value}%
                  </span>
                  <span
                    style={{ fontSize: "0.78rem", fontWeight: 700, color: item.color }}
                  >
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ELI5 Notice */}
      <AnimatePresence>
        {eli5Mode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div
              className="p-3 rounded-xl flex items-center gap-3"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
            >
              <Sparkles size={14} style={{ color: "#10B981", flexShrink: 0 }} />
              <span style={{ fontSize: "0.8rem", color: "#10B981", fontWeight: 500 }}>
                ELI5 mode is ON — showing simple explanations for each fund
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Investment Cards */}
      <div className="space-y-3">
        {investments.map((inv, i) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
          >
            <InvestmentCard inv={inv} eli5Mode={eli5Mode} />
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-4 rounded-2xl"
        style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}
      >
        <p style={{ fontSize: "0.75rem", color: "#78716C", lineHeight: 1.6 }}>
          ⚠️ <strong>Educational Only:</strong> These are AI-generated suggestions based on your
          profile for learning purposes. Past returns are not indicative of future performance.
          Please consult a SEBI-registered financial advisor before investing.
        </p>
      </motion.div>

      {/* Crash Modal */}
      <AnimatePresence>
        {showCrashModal && (
          <CrashSimulatorModal onClose={() => setShowCrashModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
