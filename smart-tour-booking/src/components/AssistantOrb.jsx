import { useId } from "react";
import { FaRobot } from "react-icons/fa";

function AssistantOrb({ onClick, className = "", label = "AI Assistant" }) {
  const gradId = useId();

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative inline-grid place-items-center rounded-full border border-emerald-500/30 bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.6)] transition-all duration-300 active:scale-95 cursor-pointer overflow-visible ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="pointer-events-none absolute -inset-[4px] rounded-full animate-spin" style={{ animationDuration: "3s" }}>
        <svg viewBox="0 0 56 56" className="h-full w-full">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle cx="28" cy="28" r="26" fill="none" stroke={`url(#${gradId})`} strokeWidth="2.8" strokeLinecap="round" strokeDasharray="42 160" />
          <circle cx="28" cy="28" r="26" fill="none" stroke={`url(#${gradId})`} strokeWidth="2.8" strokeLinecap="round" strokeDasharray="14 200" strokeDashoffset="80" opacity="0.75" />
        </svg>
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-full animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(16,185,129,0.25)_360deg)] opacity-70" />
      <span className="pointer-events-none absolute -inset-[2px] rounded-full animate-[spin_6s_linear_infinite_reverse] bg-[conic-gradient(from_180deg,rgba(6,182,212,0.18),transparent,rgba(139,92,246,0.18))] opacity-80" />
      <FaRobot className="relative z-10 h-8 w-8" />
    </button>
  );
}

export default AssistantOrb;
