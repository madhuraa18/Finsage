import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calculator, Info, TrendingUp, IndianRupee } from "lucide-react";

function formatLakh(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${val.toLocaleString("en-IN")}`;
}

function calculateSIP(monthly: number, years: number, ratePercent: number) {
  const months = years * 12;
  const r = ratePercent / 100 / 12;
  const maturity = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  const invested = monthly * months;
  const gains = maturity - invested;
  return { maturity, invested, gains };
}

function calculateInflationAdjusted(
  maturity: number,
  years: number,
  inflationRate = 6
): number {
  const r = inflationRate / 100;
  return maturity / Math.pow(1 + r, years);
}

function generateChartData(
  monthly: number,
  years: number,
  ratePercent: number
) {
  const data = [];
  for (let y = 1; y <= years; y++) {
    const { maturity, invested } = calculateSIP(monthly, y, ratePercent);
    data.push({
      year: `Y${y}`,
      Invested: Math.round(invested),
      Growth: Math.round(maturity),
    });
  }
  return data;
}

function InputSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  color = "#3B82F6",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  color?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div
      className="p-4 rounded-2xl"
      style={{ background: "#fff", border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 500 }}>
          {label}
        </span>
        <span
          className="px-3 py-1 rounded-lg"
          style={{
            background: `${color}12`,
            fontSize: "0.9rem",
            fontWeight: 800,
            color: color,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          accentColor: color,
          background: `linear-gradient(to right, ${color} ${pct}%, #E2E8F0 ${pct}%)`,
          appearance: "auto",
          height: "4px",
          borderRadius: "999px",
          cursor: "pointer",
        }}
      />
      <div className="flex justify-between mt-1.5">
        <span style={{ fontSize: "0.7rem", color: "#CBD5E1" }}>{min}</span>
        <span style={{ fontSize: "0.7rem", color: "#CBD5E1" }}>{max}</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-3 rounded-xl shadow-lg"
        style={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "6px" }}>
          {label}
        </p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ fontSize: "0.78rem", color: "#fff" }}>
              {p.name}: {formatLakh(p.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CalculatorPage() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const result = useMemo(() => calculateSIP(monthly, years, rate), [monthly, years, rate]);
  const realValue = useMemo(
    () => calculateInflationAdjusted(result.maturity, years),
    [result.maturity, years]
  );
  const chartData = useMemo(
    () => generateChartData(monthly, years, rate),
    [monthly, years, rate]
  );

  return (
    <div
      className="min-h-full p-4 md:p-6 max-w-2xl mx-auto"
      style={{ background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}
        >
          <Calculator size={20} className="text-white" />
        </div>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A" }}>
            SIP Calculator
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            Visualise your wealth journey
          </p>
        </div>
      </motion.div>

      {/* Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="space-y-3 mb-5"
      >
        <InputSlider
          label="Monthly SIP Amount"
          value={monthly}
          min={500}
          max={100000}
          step={500}
          onChange={setMonthly}
          display={`₹${monthly.toLocaleString("en-IN")}`}
          color="#10B981"
        />
        <InputSlider
          label="Investment Duration"
          value={years}
          min={1}
          max={30}
          step={1}
          onChange={setYears}
          display={`${years} yr${years > 1 ? "s" : ""}`}
          color="#3B82F6"
        />
        <InputSlider
          label="Expected Annual Return"
          value={rate}
          min={4}
          max={24}
          step={0.5}
          onChange={setRate}
          display={`${rate}%`}
          color="#8B5CF6"
        />
      </motion.div>

      {/* Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        className="rounded-2xl p-5 mb-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          border: "1px solid rgba(16,185,129,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute -top-12 -right-12 rounded-full pointer-events-none"
          style={{
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "6px" }}>
            You could reach
          </p>
          <motion.div
            key={result.maturity}
            initial={{ scale: 0.95, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              fontWeight: 900,
              color: "#10B981",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
              marginBottom: "4px",
            }}
          >
            {formatLakh(Math.round(result.maturity))}
          </motion.div>
          <p style={{ fontSize: "0.82rem", color: "#64748B" }}>
            in {years} years at {rate}% p.a.
          </p>

          <div
            className="grid grid-cols-3 gap-4 mt-5 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { label: "Total Invested", value: formatLakh(Math.round(result.invested)), color: "#3B82F6" },
              { label: "Estimated Gains", value: formatLakh(Math.round(result.gains)), color: "#10B981" },
              {
                label: "Real Value*",
                value: formatLakh(Math.round(realValue)),
                color: "#F59E0B",
                tooltip: true,
              },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: item.color,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.value}
                </div>
                <div
                  className="flex items-center gap-1 mt-0.5"
                  style={{ fontSize: "0.68rem", color: "#64748B" }}
                >
                  {item.label}
                  {item.tooltip && (
                    <div title="Inflation-adjusted value at 6% per year">
                      <Info size={10} style={{ color: "#F59E0B" }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Inflation note */}
          <p style={{ fontSize: "0.72rem", color: "#475569", marginTop: "10px" }}>
            *Real Value: inflation-adjusted at 6% p.a. — what your money is worth in today's purchasing power.
          </p>
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-5 mb-5"
        style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
            Wealth Projection
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Invested</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Growth</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => {
                if (v >= 10000000) return `${(v / 10000000).toFixed(1)}Cr`;
                if (v >= 100000) return `${(v / 100000).toFixed(0)}L`;
                if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
                return v;
              }}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="Growth"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fill="url(#growthGrad)"
            />
            <Area
              type="monotone"
              dataKey="Invested"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#investedGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="rounded-2xl p-4"
        style={{
          background: "rgba(59,130,246,0.06)",
          border: "1px solid rgba(59,130,246,0.15)",
        }}
      >
        <div className="flex items-start gap-3">
          <TrendingUp size={16} style={{ color: "#3B82F6", marginTop: "2px", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1E293B", marginBottom: "4px" }}>
              Power of Compounding
            </p>
            <p style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.6 }}>
              Starting ₹5,000/mo SIP at age 25 instead of 35 could double your retirement corpus.
              Every year you delay costs significantly more in the long run.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Preset quick selectors */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-4"
      >
        <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: "10px" }}>
          Quick presets:
        </p>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Conservative 7%", monthly: 5000, years: 10, rate: 7 },
            { label: "Balanced 12%", monthly: 10000, years: 15, rate: 12 },
            { label: "Growth 15%", monthly: 15000, years: 20, rate: 15 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setMonthly(preset.monthly);
                setYears(preset.years);
                setRate(preset.rate);
              }}
              className="px-3 py-1.5 rounded-xl transition-all duration-200 hover:bg-blue-50"
              style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#475569",
              }}
            >
              <IndianRupee size={11} className="inline -mt-0.5" />
              {preset.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
