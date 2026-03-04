import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, Search } from "lucide-react";

const indices = [
  {
    name: "NIFTY 50",
    value: "22,456.85",
    change: "+165.40",
    pct: "+0.74%",
    up: true,
    data: [
      { t: "9AM", v: 22291 }, { t: "10AM", v: 22340 }, { t: "11AM", v: 22280 },
      { t: "12PM", v: 22390 }, { t: "1PM", v: 22420 }, { t: "2PM", v: 22380 },
      { t: "3PM", v: 22457 },
    ],
  },
  {
    name: "SENSEX",
    value: "74,119.43",
    change: "+502.30",
    pct: "+0.68%",
    up: true,
    data: [
      { t: "9AM", v: 73617 }, { t: "10AM", v: 73780 }, { t: "11AM", v: 73650 },
      { t: "12PM", v: 73900 }, { t: "1PM", v: 74050 }, { t: "2PM", v: 73980 },
      { t: "3PM", v: 74119 },
    ],
  },
  {
    name: "NIFTY BANK",
    value: "48,234.60",
    change: "-120.15",
    pct: "-0.25%",
    up: false,
    data: [
      { t: "9AM", v: 48355 }, { t: "10AM", v: 48290 }, { t: "11AM", v: 48400 },
      { t: "12PM", v: 48220 }, { t: "1PM", v: 48180 }, { t: "2PM", v: 48250 },
      { t: "3PM", v: 48235 },
    ],
  },
  {
    name: "NIFTY IT",
    value: "38,762.10",
    change: "+445.80",
    pct: "+1.16%",
    up: true,
    data: [
      { t: "9AM", v: 38316 }, { t: "10AM", v: 38450 }, { t: "11AM", v: 38580 },
      { t: "12PM", v: 38620 }, { t: "1PM", v: 38700 }, { t: "2PM", v: 38730 },
      { t: "3PM", v: 38762 },
    ],
  },
];

const mutualFunds = [
  {
    name: "Mirae Asset Large Cap",
    category: "Large Cap",
    nav: "₹102.45",
    ret1y: "+22.4%",
    ret3y: "+14.8%",
    rating: 5,
    up: true,
    aum: "₹38,420 Cr",
  },
  {
    name: "HDFC Mid-Cap Opportunities",
    category: "Mid Cap",
    nav: "₹187.30",
    ret1y: "+38.2%",
    ret3y: "+22.1%",
    rating: 5,
    up: true,
    aum: "₹59,118 Cr",
  },
  {
    name: "UTI Nifty 50 Index Fund",
    category: "Index Fund",
    nav: "₹131.20",
    ret1y: "+19.8%",
    ret3y: "+13.6%",
    rating: 4,
    up: true,
    aum: "₹17,284 Cr",
  },
  {
    name: "Axis Small Cap Fund",
    category: "Small Cap",
    nav: "₹96.80",
    ret1y: "+45.6%",
    ret3y: "+27.3%",
    rating: 4,
    up: true,
    aum: "₹21,342 Cr",
  },
  {
    name: "SBI Bluechip Fund",
    category: "Large Cap",
    nav: "₹76.35",
    ret1y: "+17.2%",
    ret3y: "+12.4%",
    rating: 4,
    up: true,
    aum: "₹44,982 Cr",
  },
  {
    name: "ICICI Pru Balanced Advantage",
    category: "Hybrid",
    nav: "₹62.18",
    ret1y: "+14.6%",
    ret3y: "+11.8%",
    rating: 4,
    up: true,
    aum: "₹52,736 Cr",
  },
  {
    name: "Nippon India Gold ETF",
    category: "Gold ETF",
    nav: "₹58.90",
    ret1y: "+12.3%",
    ret3y: "+9.4%",
    rating: 3,
    up: true,
    aum: "₹8,124 Cr",
  },
  {
    name: "Quant Small Cap Fund",
    category: "Small Cap",
    nav: "₹215.40",
    ret1y: "-8.2%",
    ret3y: "+31.4%",
    rating: 3,
    up: false,
    aum: "₹22,190 Cr",
  },
];

const categories = ["All", "Large Cap", "Mid Cap", "Small Cap", "Index Fund", "Hybrid", "Gold ETF"];

function MiniChart({ data, up }: { data: { t: string; v: number }[]; up: boolean }) {
  return (
    <ResponsiveContainer width={80} height={36}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={up ? "#10B981" : "#EF4444"}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function MarketPage() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filteredFunds = mutualFunds.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || f.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div
      className="min-h-full p-4 md:p-6 max-w-2xl mx-auto"
      style={{ background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #10B981, #3B82F6)" }}
          >
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A" }}>
              Market Overview
            </h1>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Today · Feb 28, 2026
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
          <RefreshCw size={14} style={{ color: "#64748B" }} />
          <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Refresh</span>
        </button>
      </motion.div>

      {/* Index Cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="grid grid-cols-2 gap-3 mb-5"
      >
        {indices.map((idx, i) => (
          <motion.div
            key={idx.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.06 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl p-4 transition-shadow duration-200 hover:shadow-md"
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "2px" }}>
                  {idx.name}
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "#0F172A",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {idx.value}
                </p>
              </div>
              <MiniChart data={idx.data} up={idx.up} />
            </div>
            <div className="flex items-center gap-1.5">
              {idx.up ? (
                <TrendingUp size={13} style={{ color: "#10B981" }} />
              ) : (
                <TrendingDown size={13} style={{ color: "#EF4444" }} />
              )}
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: idx.up ? "#10B981" : "#EF4444",
                }}
              >
                {idx.change}
              </span>
              <span
                className="px-1.5 py-0.5 rounded-md"
                style={{
                  background: idx.up ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: idx.up ? "#10B981" : "#EF4444",
                }}
              >
                {idx.pct}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mutual Funds Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <h2
          className="mb-3"
          style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}
        >
          Mutual Funds
        </h2>

        {/* Search */}
        <div className="relative mb-3">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#94a3b8" }}
          />
          <input
            type="text"
            placeholder="Search funds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl outline-none transition-all duration-200"
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              fontSize: "0.875rem",
              color: "#1E293B",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className="shrink-0 px-3 py-1.5 rounded-xl transition-all duration-200"
              style={{
                background: filterCat === cat ? "rgba(59,130,246,0.12)" : "#fff",
                border: filterCat === cat ? "1.5px solid rgba(59,130,246,0.4)" : "1px solid #E2E8F0",
                fontSize: "0.75rem",
                fontWeight: filterCat === cat ? 700 : 400,
                color: filterCat === cat ? "#3B82F6" : "#64748B",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fund List */}
        <div className="space-y-2">
          {filteredFunds.map((fund, i) => (
            <motion.div
              key={fund.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.05 }}
              whileHover={{ y: -1 }}
              className="rounded-2xl p-4 transition-shadow duration-200 hover:shadow-md cursor-pointer"
              style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <p
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        color: "#0F172A",
                      }}
                    >
                      {fund.name}
                    </p>
                    <span
                      className="px-1.5 py-0.5 rounded-md shrink-0"
                      style={{
                        background: "#F1F5F9",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        color: "#64748B",
                      }}
                    >
                      {fund.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                      NAV: <span style={{ color: "#1E293B", fontWeight: 600 }}>{fund.nav}</span>
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                      AUM: {fund.aum}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: fund.up ? "#10B981" : "#EF4444",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {fund.ret1y}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>1Y Return</div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#3B82F6",
                      marginTop: "2px",
                    }}
                  >
                    {fund.ret3y} (3Y)
                  </div>
                </div>
              </div>
              {/* Star Rating */}
              <div className="flex items-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{
                      background: j < fund.rating ? "#F59E0B" : "#E2E8F0",
                    }}
                  />
                ))}
                <span style={{ fontSize: "0.68rem", color: "#94a3b8", marginLeft: "4px" }}>
                  CRISIL Rating
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl p-4 mt-2"
        style={{
          background: "rgba(245,158,11,0.06)",
          border: "1px solid rgba(245,158,11,0.15)",
        }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle size={14} style={{ color: "#F59E0B", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "0.75rem", color: "#78716C", lineHeight: 1.6 }}>
            <strong>Disclaimer:</strong> Market data and fund returns shown are for educational
            purposes only. Past returns do not guarantee future performance. All investment
            decisions should be made after consulting a SEBI-registered investment advisor.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
