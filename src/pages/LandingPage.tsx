import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  BookOpen,
  TrendingUp,
  Brain,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  IndianRupee,
  ChevronRight,
} from "lucide-react";

const graphPath =
  "M0,280 C60,265 100,240 160,210 C220,180 270,165 340,145 C400,128 450,118 520,100 C590,82 640,72 710,58 C780,44 830,36 900,26 C960,18 1010,12 1080,7 C1140,3 1200,1 1280,0";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    desc: "Get personalized investment strategies tailored to your income, goals, and risk profile.",
    color: "#10B981",
  },
  {
    icon: BarChart3,
    title: "Live Market Data",
    desc: "Track NIFTY, SENSEX, and mutual fund performance in a calm, clutter-free view.",
    color: "#3B82F6",
  },
  {
    icon: IndianRupee,
    title: "SIP Calculator",
    desc: "Visualize your wealth journey with smart projections and inflation-adjusted returns.",
    color: "#F59E0B",
  },
  {
    icon: BookOpen,
    title: "Financial Learning",
    desc: "Build confidence with bite-sized lessons designed for beginner to intermediate investors.",
    color: "#10B981",
  },
];

const trustBadges = [
  { icon: Shield, label: "Bank-Level Secure" },
  { icon: Lock, label: "Data Encrypted" },
  { icon: BookOpen, label: "Educational Only" },
];

const stats = [
  { value: "2.4L+", label: "Indian professionals" },
  { value: "₹480Cr+", label: "Wealth tracked" },
  { value: "94%", label: "User satisfaction" },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: "#0F172A" }}
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            className="px-4 py-2 rounded-2xl flex items-center gap-3"
            style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
            >
              <TrendingUp size={14} className="text-white" />
            </div>
            <span className="text-white" style={{ fontWeight: 700, fontSize: "1rem" }}>
              FinSage
            </span>
          </div>

          <div
            className="hidden md:flex items-center gap-8 px-6 py-2 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {["Features", "Calculator", "Learn", "Market"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-200"
                style={{ fontSize: "0.9rem" }}
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={() => navigate("/onboarding")}
            className="px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)", fontSize: "0.9rem", fontWeight: 600 }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background animated graph */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div
            className="absolute rounded-full"
            style={{
              width: "600px", height: "600px",
              top: "-200px", right: "-100px",
              background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "500px", height: "500px",
              bottom: "-100px", left: "-100px",
              background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
            }}
          />

          {/* Animated SVG Graph */}
          <svg
            className="absolute bottom-0 left-0 right-0 w-full"
            height="320"
            viewBox="0 0 1280 320"
            preserveAspectRatio="none"
            style={{ opacity: 0.12 }}
          >
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={graphPath}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d={`${graphPath} L1280,320 L0,320 Z`}
              fill="url(#heroGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
            />
          </svg>

          {/* Grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <Sparkles size={14} className="text-[#10B981]" />
            <span className="text-[#10B981]" style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              AI-POWERED FINANCIAL GUIDANCE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            Build Wealth with AI.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10B981, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Invest Smarter.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 mb-10 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.7 }}
          >
            Personalized AI guidance for Indian salaried professionals. Understand your finances,
            build smart SIPs, and grow wealth confidently — no jargon, no complexity.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            onClick={() => navigate("/onboarding")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white mb-12 transition-shadow duration-200"
            style={{
              background: "linear-gradient(135deg, #10B981, #059669)",
              fontSize: "1.05rem",
              fontWeight: 600,
              boxShadow: "0 0 40px rgba(16,185,129,0.4), 0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            Start Your Financial Journey
            <ArrowRight size={20} />
          </motion.button>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center justify-center gap-6 flex-wrap"
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-slate-500">
                <badge.icon size={14} className="text-[#10B981]" />
                <span style={{ fontSize: "0.82rem" }}>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div
                className="text-white mb-1"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {stat.value}
              </div>
              <div className="text-slate-500" style={{ fontSize: "0.85rem" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Everything you need to{" "}
              <span className="text-[#10B981]">grow your wealth</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              Built specifically for Indian professionals who want clarity, confidence, and control over their finances.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl cursor-default transition-all duration-250"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="text-white mb-2" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p className="text-slate-400" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why FinSage */}
      <section className="py-24 px-6" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.3rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Designed for{" "}
              <span className="text-[#3B82F6]">clarity & confidence</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              "No confusing jargon — plain, simple language throughout",
              "AI recommendations tailored to your income and Indian tax laws",
              "50-30-20 rule tracking keeps your budget healthy",
              "Step-by-step SIP guidance with SEBI-registered fund suggestions",
              "Emergency fund planning before any investment advice",
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}
              >
                <CheckCircle2 size={20} className="text-[#10B981] shrink-0" />
                <span className="text-slate-300" style={{ fontSize: "0.95rem" }}>
                  {point}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.1))",
              border: "1px solid rgba(16,185,129,0.25)",
              backdropFilter: "blur(16px)",
            }}
          >
            <Sparkles size={40} className="text-[#10B981] mx-auto mb-6" />
            <h2 className="text-white mb-4" style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Ready to invest smarter?
            </h2>
            <p className="text-slate-400 mb-8" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              Join thousands of Indian professionals who are building wealth with AI-guided confidence.
            </p>
            <button
              onClick={() => navigate("/onboarding")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white transition-all duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 0 32px rgba(16,185,129,0.35)",
              }}
            >
              Start Your Financial Journey
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="text-slate-600" style={{ fontSize: "0.8rem" }}>
          © 2026 FinSage. For educational purposes only. Not SEBI registered investment advice.
        </div>
      </footer>
    </div>
  );
}
