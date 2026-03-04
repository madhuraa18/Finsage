import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

const surplusData = [
  { name: "Savings", value: 30, color: "#10B981" },
  { name: "Expenses", value: 50, color: "#3B82F6" },
  { name: "EMI", value: 20, color: "#F59E0B" },
];

function useCountUp(target: number, duration = 1200, start = true) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.round(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, duration, start]);

  return count;
}

function NetWorthCard() {
  const netWorth = useCountUp(1245000, 1400);
  const monthly = useCountUp(25500, 1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        border: "1px solid rgba(16,185,129,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(16,185,129,0.06)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 rounded-full pointer-events-none"
        style={{
          width: "200px", height: "200px",
          background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-400" style={{ fontSize: "0.85rem" }}>Total Net Worth</span>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            <TrendingUp size={12} className="text-[#10B981]" />
            <span className="text-[#10B981]" style={{ fontSize: "0.78rem", fontWeight: 600 }}>+8.2%</span>
          </div>
        </div>
        <div
          className="text-white mb-1"
          style={{ fontSize: "2.2rem", fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}
        >
          ₹{(netWorth / 100000).toFixed(2)}L
        </div>
        <div className="text-slate-500" style={{ fontSize: "0.8rem" }}>Updated today at 2:30 PM</div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { label: "Monthly Surplus", value: `₹${(monthly / 1000).toFixed(1)}K`, color: "#10B981" },
            { label: "Total Invested", value: "₹8.6L", color: "#3B82F6" },
            { label: "Emergency Fund", value: "₹1.5L", color: "#F59E0B" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-white" style={{ fontSize: "1rem", fontWeight: 700, color: item.color }}>
                {item.value}
              </div>
              <div className="text-slate-500" style={{ fontSize: "0.7rem", marginTop: "2px" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SurplusBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl p-5"
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h3 className="mb-4" style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
        Monthly Allocation
      </h3>
      <div className="flex items-center gap-4">
        <div style={{ width: 120, height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={surplusData}
                cx="50%"
                cy="50%"
                innerRadius={34}
                outerRadius={54}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {surplusData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, ""]}
                contentStyle={{
                  background: "#1E293B", border: "none", borderRadius: "8px",
                  color: "#fff", fontSize: "0.8rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {surplusData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                <span style={{ fontSize: "0.82rem", color: "#64748B" }}>{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1E293B" }}>
                  {item.value}%
                </span>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                  ₹{(85000 * item.value / 100 / 1000).toFixed(1)}K
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Rule503020() {
  const rules = [
    { label: "Needs", target: 50, actual: 59, color: "#3B82F6" },
    { label: "Wants", target: 30, actual: 12, color: "#F59E0B" },
    { label: "Invest", target: 20, actual: 30, color: "#10B981" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>50-30-20 Rule</h3>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-lg"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <ShieldCheck size={12} className="text-[#10B981]" />
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#10B981" }}>Healthy</span>
        </div>
      </div>
      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.label}>
            <div className="flex justify-between mb-1.5">
              <span style={{ fontSize: "0.82rem", color: "#64748B" }}>{rule.label}</span>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Target {rule.target}%</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: rule.actual > rule.target + 5 ? "#F59E0B" : "#1E293B" }}>
                  {rule.actual}%
                </span>
              </div>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rule.actual}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full relative"
                style={{ background: rule.color }}
              >
                <div
                  className="absolute top-0 bottom-0 rounded-full"
                  style={{
                    left: `${(rule.target / rule.actual) * 100}%`,
                    width: "2px",
                    background: "rgba(255,255,255,0.7)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function EmergencyFund() {
  const current = 150000;
  const target = 510000; // 6 months of expenses
  const progress = (current / target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>Emergency Fund</h3>
        <Target size={18} style={{ color: "#F59E0B" }} />
      </div>
      <div className="flex items-end justify-between mb-3">
        <div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", fontVariantNumeric: "tabular-nums" }}>
            ₹1.5L
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>of ₹5.1L target</div>
        </div>
        <div
          className="px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(245,158,11,0.1)" }}
        >
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F59E0B" }}>
            {progress.toFixed(0)}% funded
          </span>
        </div>
      </div>
      <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: "#F1F5F9" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #F59E0B, #F97316)" }}
        >
          {/* shimmer */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              animation: "shimmer 2s infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
      </div>
      <p style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
        Goal: 6 months of expenses (₹85K/mo). Add ₹5K/mo to reach in 18 months.
      </p>
    </motion.div>
  );
}

function DTIGauge() {
  const dti = 23; // Debt-to-Income ratio in %
  const angle = (dti / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>Debt-to-Income</h3>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-lg"
          style={{ background: "rgba(16,185,129,0.1)" }}
        >
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#10B981" }}>Healthy</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <svg width="160" height="90" viewBox="0 0 160 90">
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          {/* Background arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Color arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="188.5"
            strokeDashoffset="0"
            opacity="0.25"
          />
          {/* Needle */}
          <motion.line
            x1="80"
            y1="80"
            x2="80"
            y2="28"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: angle }}
            style={{ transformOrigin: "80px 80px" }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />
          <circle cx="80" cy="80" r="5" fill="#0F172A" />
          {/* Zone labels */}
          <text x="10" y="88" fill="#10B981" style={{ fontSize: "8px", fontWeight: 600 }}>Low</text>
          <text x="70" y="18" fill="#F59E0B" style={{ fontSize: "8px", fontWeight: 600 }}>Mid</text>
          <text x="132" y="88" fill="#EF4444" style={{ fontSize: "8px", fontWeight: 600 }}>High</text>
        </svg>
        <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0F172A", marginTop: "-8px" }}>
          {dti}%
        </div>
        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
          EMI / Monthly Income. Ideal is below 30%.
        </div>
      </div>
    </motion.div>
  );
}

function AIInsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(59,130,246,0.08) 100%)",
        border: "1px solid rgba(16,185,129,0.25)",
        boxShadow: "0 4px 20px rgba(16,185,129,0.08)",
      }}
    >
      <div
        className="absolute -top-8 -right-8 rounded-full pointer-events-none"
        style={{
          width: "160px", height: "160px",
          background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
        }}
      />
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #10B981, #3B82F6)" }}
        >
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#10B981" }}>AI INSIGHT</span>
          </div>
          <p style={{ fontSize: "0.95rem", color: "#1E293B", lineHeight: 1.6, fontWeight: 500 }}>
            You're saving more than{" "}
            <span style={{ color: "#10B981", fontWeight: 700 }}>65% of users</span>{" "}
            your age. Your emergency fund is your next priority — you're 3 months away from financial safety!
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function QuickActions() {
  const actions = [
    { icon: Zap, label: "Start SIP", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
    { icon: TrendingUp, label: "Market", color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
    { icon: Target, label: "Calculator", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
    { icon: AlertTriangle, label: "Learn", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="grid grid-cols-4 gap-3"
    >
      {actions.map((action) => (
        <button
          key={action.label}
          className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 hover:scale-105"
          style={{
            background: action.bg,
            border: `1px solid ${action.color}25`,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: action.bg }}
          >
            <action.icon size={18} style={{ color: action.color }} />
          </div>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#1E293B" }}>{action.label}</span>
        </button>
      ))}
    </motion.div>
  );
}

function MarketSummary() {
  const indices = [
    { name: "NIFTY 50", value: "22,456", change: "+0.73%", up: true },
    { name: "SENSEX", value: "74,119", change: "+0.68%", up: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>Market Today</h3>
        <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {indices.map((idx) => (
          <div
            key={idx.name}
            className="p-3 rounded-xl"
            style={{ background: idx.up ? "rgba(16,185,129,0.06)" : "rgba(239,68,68,0.06)" }}
          >
            <div style={{ fontSize: "0.75rem", color: "#64748B", marginBottom: "4px" }}>{idx.name}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", fontVariantNumeric: "tabular-nums" }}>
              {idx.value}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {idx.up ? (
                <ArrowUpRight size={12} className="text-[#10B981]" />
              ) : (
                <TrendingDown size={12} className="text-red-500" />
              )}
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: idx.up ? "#10B981" : "#EF4444" }}>
                {idx.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function DashboardPage() {
  return (
    <div className="min-h-full p-4 md:p-6 max-w-2xl mx-auto" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div className="mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-slate-500 mb-1"
          style={{ fontSize: "0.85rem" }}
        >
          Good afternoon,
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A" }}
        >
          Arjun Sharma 👋
        </motion.h1>
      </div>

      <div className="space-y-4">
        <NetWorthCard />
        <QuickActions />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SurplusBreakdown />
          <Rule503020 />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EmergencyFund />
          <DTIGauge />
        </div>
        <AIInsightCard />
        <MarketSummary />
      </div>
    </div>
  );
}
