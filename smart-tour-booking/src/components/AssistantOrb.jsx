import { useId } from "react";
import { FaRobot } from "react-icons/fa";

function AssistantOrb({ onClick, className = "", label = "AI Assistant" }) {
  const gradId = useId();

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative grid place-items-center rounded-xl border border-gray-200/60 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-gray-100/70 dark:hover:bg-slate-800/80 transition-all duration-300 active:scale-95 cursor-pointer shadow-sm hover:shadow-md ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-[-3px] animate-spin"
        style={{ animationDuration: "4s" }}
      >
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="30 122"
          />
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="8 140"
            strokeDashoffset="64"
            opacity="0.55"
          />
        </svg>
      </span>
      <FaRobot className="relative z-10 h-4 w-4" />
    </button>
  );
}

export default AssistantOrb;
