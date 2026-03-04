import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Star,
  CheckCircle2,
  ChevronRight,
  Zap,
  Shield,
  TrendingUp,
  PieChart,
  Home,
  X,
} from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Module {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  xp: number;
  progress: number;
  lessons: number;
  completed: number;
  quiz: QuizQuestion;
  tag: string;
}

const modules: Module[] = [
  {
    id: "basics",
    title: "Financial Basics",
    desc: "Income, expenses, savings rate, and budgeting for salaried professionals.",
    icon: Home,
    color: "#10B981",
    xp: 120,
    progress: 100,
    lessons: 5,
    completed: 5,
    tag: "Completed",
    quiz: {
      question: "What is the 50-30-20 rule about?",
      options: [
        "50% needs, 30% wants, 20% savings/investments",
        "50% savings, 30% EMI, 20% entertainment",
        "50% equity, 30% debt, 20% gold",
        "None of the above",
      ],
      correct: 0,
      explanation:
        "The 50-30-20 rule suggests 50% of income for needs, 30% for wants, and 20% for savings/investments. It's a simple framework to maintain financial health.",
    },
  },
  {
    id: "emergency",
    title: "Emergency Fund",
    desc: "Why you need 6 months of expenses saved before you invest a single rupee.",
    icon: Shield,
    color: "#F59E0B",
    xp: 100,
    progress: 60,
    lessons: 4,
    completed: 2,
    tag: "In Progress",
    quiz: {
      question: "How many months of expenses should your emergency fund cover?",
      options: ["1–2 months", "3–4 months", "6 months (or more)", "12 months"],
      correct: 2,
      explanation:
        "Most financial experts recommend 6 months of expenses as an emergency fund. This covers job loss, medical emergencies, or any unexpected shock without touching investments.",
    },
  },
  {
    id: "sip",
    title: "SIP & Mutual Funds",
    desc: "How SIPs work, types of mutual funds, and how to pick the right fund.",
    icon: TrendingUp,
    color: "#3B82F6",
    xp: 150,
    progress: 0,
    lessons: 6,
    completed: 0,
    tag: "New",
    quiz: {
      question: "What does SIP stand for?",
      options: [
        "Systematic Income Plan",
        "Systematic Investment Plan",
        "Safe Investment Product",
        "Stock Index Portfolio",
      ],
      correct: 1,
      explanation:
        "SIP stands for Systematic Investment Plan. It allows you to invest a fixed amount in mutual funds at regular intervals (usually monthly), leveraging rupee cost averaging.",
    },
  },
  {
    id: "equity",
    title: "Stock Market Basics",
    desc: "What is equity, how markets work, and how to think about long-term investing.",
    icon: PieChart,
    color: "#8B5CF6",
    xp: 180,
    progress: 0,
    lessons: 7,
    completed: 0,
    tag: "Intermediate",
    quiz: {
      question: "If NIFTY 50 drops 30%, what should a long-term SIP investor do?",
      options: [
        "Sell everything immediately",
        "Pause SIPs temporarily",
        "Continue SIPs — you're buying cheaper units",
        "Switch to FDs",
      ],
      correct: 2,
      explanation:
        "Market crashes are opportunities for SIP investors. When prices fall, your monthly SIP buys more units at cheaper prices, increasing your potential returns when markets recover.",
    },
  },
  {
    id: "tax",
    title: "Tax & ELSS",
    desc: "Section 80C deductions, ELSS funds, and saving tax while building wealth.",
    icon: Zap,
    color: "#F97316",
    xp: 140,
    progress: 0,
    lessons: 5,
    completed: 0,
    tag: "Popular",
    quiz: {
      question: "What is the maximum tax deduction under Section 80C?",
      options: ["₹1 Lakh", "₹1.5 Lakh", "₹2 Lakh", "₹2.5 Lakh"],
      correct: 1,
      explanation:
        "Section 80C allows a maximum deduction of ₹1.5 Lakh from your taxable income. ELSS (Equity Linked Savings Scheme) is one of the best 80C options — it has the shortest lock-in (3 years) and market-linked returns.",
    },
  },
];

function ProgressRing({
  progress,
  color,
  size = 48,
}: {
  progress: number;
  color: string;
  size?: number;
}) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#F1F5F9"
        strokeWidth={5}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
}

function QuizModal({
  mod,
  onClose,
}: {
  mod: Module;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

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
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl p-6"
        style={{ background: "#fff", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: `${mod.color}15` }}
            >
              <mod.icon size={20} style={{ color: mod.color }} />
            </div>
            <div>
              <p style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 500 }}>
                QUICK QUIZ
              </p>
              <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>
                {mod.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100"
          >
            <X size={16} style={{ color: "#64748B" }} />
          </button>
        </div>

        <p
          className="mb-5"
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#1E293B",
            lineHeight: 1.5,
          }}
        >
          {mod.quiz.question}
        </p>

        <div className="space-y-2 mb-4">
          {mod.quiz.options.map((opt, i) => {
            let bg = "#F8FAFC";
            let border = "#E2E8F0";
            let textColor = "#475569";
            if (answered) {
              if (i === mod.quiz.correct) {
                bg = "rgba(16,185,129,0.1)";
                border = "rgba(16,185,129,0.4)";
                textColor = "#059669";
              } else if (i === selected && selected !== mod.quiz.correct) {
                bg = "rgba(239,68,68,0.08)";
                border = "rgba(239,68,68,0.3)";
                textColor = "#DC2626";
              }
            } else if (i === selected) {
              bg = `${mod.color}10`;
              border = `${mod.color}40`;
              textColor = mod.color;
            }
            return (
              <button
                key={i}
                onClick={() => {
                  if (!answered) {
                    setSelected(i);
                    setAnswered(true);
                  }
                }}
                className="w-full text-left p-3 rounded-xl transition-all duration-200"
                style={{
                  background: bg,
                  border: `1.5px solid ${border}`,
                  fontSize: "0.88rem",
                  color: textColor,
                  fontWeight: answered && i === mod.quiz.correct ? 600 : 400,
                  cursor: answered ? "default" : "pointer",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{
                      background:
                        answered && i === mod.quiz.correct
                          ? "#10B981"
                          : answered && i === selected && selected !== mod.quiz.correct
                          ? "#EF4444"
                          : i === selected && !answered
                          ? mod.color
                          : "#E2E8F0",
                      fontSize: "0.65rem",
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  {opt}
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl mb-4"
              style={{
                background:
                  selected === mod.quiz.correct
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(245,158,11,0.08)",
                border: `1px solid ${
                  selected === mod.quiz.correct
                    ? "rgba(16,185,129,0.2)"
                    : "rgba(245,158,11,0.2)"
                }`,
              }}
            >
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#1E293B",
                  lineHeight: 1.6,
                }}
              >
                {selected === mod.quiz.correct ? "✅ Correct! " : "💡 Good try! "}
                {mod.quiz.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {answered && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #10B981, #059669)",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            {selected === mod.quiz.correct
              ? `Nice! +${mod.xp} XP earned 🎉`
              : "Got it, keep learning!"}
          </button>
        )}
      </motion.div>
    </div>
  );
}

export function LearnPage() {
  const [activeQuiz, setActiveQuiz] = useState<Module | null>(null);

  const totalXP = modules
    .filter((m) => m.progress === 100)
    .reduce((sum, m) => sum + m.xp, 0);

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
            style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)" }}
          >
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A" }}>
              Learning Hub
            </h1>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              Build your financial IQ
            </p>
          </div>
        </div>
        {/* XP Badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "1px solid rgba(245,158,11,0.25)",
          }}
        >
          <Star size={14} style={{ color: "#F59E0B" }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#F59E0B" }}>
            {totalXP} XP
          </span>
        </div>
      </motion.div>

      {/* Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="rounded-2xl p-4 mb-5"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          border: "1px solid rgba(139,92,246,0.25)",
        }}
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Completed",
              value: modules.filter((m) => m.progress === 100).length,
              total: modules.length,
              color: "#10B981",
            },
            {
              label: "In Progress",
              value: modules.filter((m) => m.progress > 0 && m.progress < 100).length,
              total: null,
              color: "#3B82F6",
            },
            {
              label: "Total XP",
              value: totalXP,
              total: null,
              color: "#F59E0B",
            },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: item.color,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.value}
                {item.total && (
                  <span style={{ fontSize: "0.9rem", color: "#475569" }}>
                    /{item.total}
                  </span>
                )}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#64748B" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Module Cards */}
      <div className="space-y-3">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl p-4 cursor-pointer transition-shadow duration-200 hover:shadow-md"
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-start gap-4">
              {/* Progress Ring */}
              <div className="relative shrink-0">
                <ProgressRing progress={mod.progress} color={mod.color} size={50} />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: "rotate(0deg)" }}
                >
                  {mod.progress === 100 ? (
                    <CheckCircle2
                      size={16}
                      style={{ color: mod.color }}
                    />
                  ) : (
                    <mod.icon size={14} style={{ color: mod.color }} />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
                    {mod.title}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      background:
                        mod.tag === "Completed"
                          ? "rgba(16,185,129,0.12)"
                          : mod.tag === "In Progress"
                          ? "rgba(59,130,246,0.12)"
                          : mod.tag === "New"
                          ? "rgba(139,92,246,0.12)"
                          : "rgba(245,158,11,0.12)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      color:
                        mod.tag === "Completed"
                          ? "#10B981"
                          : mod.tag === "In Progress"
                          ? "#3B82F6"
                          : mod.tag === "New"
                          ? "#8B5CF6"
                          : "#F59E0B",
                    }}
                  >
                    {mod.tag}
                  </span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.5 }}>
                  {mod.desc}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    {mod.completed}/{mod.lessons} lessons
                  </span>
                  <span style={{ color: "#CBD5E1" }}>·</span>
                  <div className="flex items-center gap-1">
                    <Star size={10} style={{ color: "#F59E0B" }} />
                    <span style={{ fontSize: "0.72rem", color: "#F59E0B", fontWeight: 600 }}>
                      +{mod.xp} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Quiz Button */}
              <button
                onClick={() => setActiveQuiz(mod)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 hover:opacity-80"
                style={{
                  background: `${mod.color}12`,
                  border: `1px solid ${mod.color}25`,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: mod.color,
                }}
              >
                Quiz
                <ChevronRight size={12} />
              </button>
            </div>

            {/* Progress Bar */}
            {mod.progress > 0 && (
              <div className="mt-3">
                <div className="h-1.5 rounded-full" style={{ background: "#F1F5F9" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mod.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: mod.color }}
                  >
                    {/* Shimmer */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        animation: "shimmer 2s infinite",
                        backgroundSize: "200% 100%",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <QuizModal mod={activeQuiz} onClose={() => setActiveQuiz(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
