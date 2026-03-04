import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PieChart as PieIcon, Plus, X, TrendingUp, TrendingDown } from "lucide-react";

const allocationData = [
  { name: "Large Cap SIP", value: 35, color: "#10B981", amount: 301000 },
  { name: "Mid Cap SIP", value: 22, color: "#3B82F6", amount: 189200 },
  { name: "Index Fund", value: 25, color: "#8B5CF6", amount: 215000 },
  { name: "Gold ETF", value: 10, color: "#F59E0B", amount: 86000 },
  { name: "Emergency Fund", value: 8, color: "#F97316", amount: 68800 },
];

const performanceData: Record<string, { date: string; value: number }[]> = {
  "1M": [
    { date: "Feb 1", value: 820000 }, { date: "Feb 7", value: 831000 },
    { date: "Feb 14", value: 826000 }, { date: "Feb 21", value: 845000 },
    { date: "Feb 28", value: 860000 },
  ],
  "6M": [
    { date: "Sep", value: 680000 }, { date: "Oct", value: 705000 },
    { date: "Nov", value: 720000 }, { date: "Dec", value: 738000 },
    { date: "Jan", value: 815000 }, { date: "Feb", value: 860000 },
  ],
  "1Y": [
    { date: "Mar 25", value: 580000 }, { date: "Jun", value: 630000 },
    { date: "Sep", value: 680000 }, { date: "Dec", value: 738000 },
    { date: "Feb 26", value: 860000 },
  ],
  "5Y": [
    { date: "2022", value: 310000 }, { date: "2023", value: 450000 },
    { date: "2024", value: 610000 }, { date: "2025", value: 738000 },
    { date: "2026", value: 860000 },
  ],
};

const holdings = [
  {
    name: "Mirae Asset Large Cap SIP",
    units: "2,340",
    nav: "₹128.60",
    invested: "₹2,40,000",
    current: "₹3,00,924",
    gain: "+₹60,924",
    gainPct: "+25.4%",
    up: true,
  },
  {
    name: "HDFC Mid-Cap Opportunities",
    units: "985",
    nav: "₹192.05",
    invested: "₹1,50,000",
    current: "₹1,89,169",
    gain: "+₹39,169",
    gainPct: "+26.1%",
    up: true,
  },
  {
    name: "UTI Nifty 50 Index Fund",
    units: "1,620",
    nav: "₹132.72",
    invested: "₹1,75,000",
    current: "₹2,15,006",
    gain: "+₹40,006",
    gainPct: "+22.9%",
    up: true,
  },
  {
    name: "Nippon Gold ETF",
    units: "14.5",
    nav: "₹5,931",
    invested: "₹75,000",
    current: "₹86,000",
    gain: "+₹11,000",
    gainPct: "+14.7%",
    up: true,
  },
];

const timeframes = ["1M", "6M", "1Y", "5Y"] as const;
type Timeframe = (typeof timeframes)[number];

function AddInvestmentModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    fundName: "",
    type: "Large Cap",
    invested: "",
    units: "",
    nav: "",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6"
        style={{ background: "#fff", boxShadow: "0 -16px 60px rgba(0,0,0,0.2)" }}
      >
        {/* Handle */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5 sm:hidden" />

        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0F172A" }}>
            Add Investment
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100"
          >
            <X size={16} style={{ color: "#64748B" }} />
          </button>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(16,185,129,0.12)" }}
            >
              <TrendingUp size={30} style={{ color: "#10B981" }} />
            </div>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
              Investment Added!
            </p>
            <p style={{ fontSize: "0.85rem", color: "#64748B" }}>
              Your portfolio has been updated successfully.
            </p>
            <button
              onClick={onClose}
              className="mt-5 px-6 py-2.5 rounded-xl text-white"
              style={{ background: "linear-gradient(135deg, #10B981, #059669)", fontWeight: 600, fontSize: "0.9rem" }}
            >
              Done
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <div>
              <label style={{ fontSize: "0.78rem", color: "#64748B", display: "block", marginBottom: "6px" }}>
                Fund Name
              </label>
              <input
                type="text"
                placeholder="e.g. Mirae Asset Large Cap"
                value={form.fundName}
                onChange={(e) => setForm({ ...form, fundName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  fontSize: "0.9rem",
                  color: "#1E293B",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.78rem", color: "#64748B", display: "block", marginBottom: "6px" }}>
                Fund Type
              </label>
              <div className="flex gap-2 flex-wrap">
                {["Large Cap", "Mid Cap", "Index", "Gold ETF", "Hybrid"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm({ ...form, type: t })}
                    className="px-3 py-1.5 rounded-xl transition-all duration-200"
                    style={{
                      background: form.type === t ? "rgba(16,185,129,0.12)" : "#F8FAFC",
                      border: form.type === t ? "1.5px solid rgba(16,185,129,0.4)" : "1px solid #E2E8F0",
                      fontSize: "0.78rem",
                      fontWeight: form.type === t ? 600 : 400,
                      color: form.type === t ? "#10B981" : "#64748B",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={{ fontSize: "0.78rem", color: "#64748B", display: "block", marginBottom: "6px" }}>
                  Amount Invested (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={form.invested}
                  onChange={(e) => setForm({ ...form, invested: e.target.value })}
                  className="w-full px-3 py-3 rounded-xl outline-none"
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    fontSize: "0.88rem",
                    color: "#1E293B",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", color: "#64748B", display: "block", marginBottom: "6px" }}>
                  Units Held
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1250"
                  value={form.units}
                  onChange={(e) => setForm({ ...form, units: e.target.value })}
                  className="w-full px-3 py-3 rounded-xl outline-none"
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    fontSize: "0.88rem",
                    color: "#1E293B",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                />
              </div>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3 rounded-xl text-white mt-2 transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              Add to Portfolio
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function PortfolioPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1Y");
  const [showAddModal, setShowAddModal] = useState(false);

  const data = performanceData[timeframe];
  const startValue = data[0].value;
  const endValue = data[data.length - 1].value;
  const gain = endValue - startValue;
  const gainPct = ((gain / startValue) * 100).toFixed(1);

  return (
    <div
      className="min-h-full p-4 md:p-6 max-w-2xl mx-auto pb-24"
      style={{ background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-5"
      >
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)" }}
        >
          <PieIcon size={20} className="text-white" />
        </div>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A" }}>
            Portfolio Tracker
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            Arjun's investment portfolio
          </p>
        </div>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="rounded-2xl p-5 mb-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          border: "1px solid rgba(139,92,246,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div
          className="absolute -top-10 -right-10 rounded-full pointer-events-none"
          style={{
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "4px" }}>
            Portfolio Value
          </p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: "#fff",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
            }}
          >
            ₹8.60L
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { label: "Invested", value: "₹6.40L", color: "#94a3b8" },
              { label: "Total Gain", value: "+₹2.20L", color: "#10B981" },
              { label: "Overall Return", value: "+34.4%", color: "#10B981" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: item.color }}>
                  {item.value}
                </div>
                <div style={{ fontSize: "0.68rem", color: "#475569", marginTop: "2px" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="rounded-2xl p-5 mb-4"
        style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
              Performance
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <TrendingUp size={12} style={{ color: "#10B981" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#10B981" }}>
                +{gainPct}% · +₹{(gain / 1000).toFixed(0)}K ({timeframe})
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className="px-2.5 py-1 rounded-lg transition-all duration-200"
                style={{
                  background: timeframe === tf ? "#0F172A" : "transparent",
                  fontSize: "0.72rem",
                  fontWeight: timeframe === tf ? 700 : 400,
                  color: timeframe === tf ? "#fff" : "#94a3b8",
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) =>
                v >= 100000 ? `${(v / 100000).toFixed(1)}L` : `${v}`
              }
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [`₹${(v / 100000).toFixed(2)}L`, "Value"]}
              contentStyle={{
                background: "#1E293B",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "0.78rem",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              dot={{ fill: "#8B5CF6", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#8B5CF6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Allocation Donut */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="rounded-2xl p-5 mb-4"
        style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h3 className="mb-4" style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
          Asset Allocation
        </h3>
        <div className="flex items-center gap-4">
          <div style={{ width: 130, height: 130 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={58}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {allocationData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => [`${v}%`, ""]}
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
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>{item.name}</span>
                </div>
                <div className="text-right">
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0F172A" }}>
                    {item.value}%
                  </span>
                  <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>
                    ₹{(item.amount / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Holdings */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
      >
        <h3 className="mb-3" style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
          Holdings
        </h3>
        <div className="space-y-3">
          {holdings.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 + i * 0.06 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl p-4 transition-shadow duration-200 hover:shadow-md"
              style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 mr-3">
                  <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F172A", marginBottom: "2px" }}>
                    {h.name}
                  </p>
                  <div className="flex items-center gap-2" style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    <span>{h.units} units</span>
                    <span>·</span>
                    <span>NAV {h.nav}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0F172A" }}>
                    {h.current}
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    {h.up ? (
                      <TrendingUp size={11} style={{ color: "#10B981" }} />
                    ) : (
                      <TrendingDown size={11} style={{ color: "#EF4444" }} />
                    )}
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: h.up ? "#10B981" : "#EF4444" }}>
                      {h.gainPct}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                  Invested: <span style={{ color: "#64748B", fontWeight: 500 }}>{h.invested}</span>
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: h.up ? "#10B981" : "#EF4444" }}>
                  {h.gain}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAB */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #10B981, #059669)",
            boxShadow: "0 4px 24px rgba(16,185,129,0.5)",
          }}
        >
          <Plus size={24} />
        </motion.button>
      </div>

      {/* Add Investment Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddInvestmentModal onClose={() => setShowAddModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
