import { useState, useRef, useEffect } from "react";
import { useAssistant } from "../context/AssistantContext";
import { useTheme } from "../context/ThemeContext";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

const GREETING =
  "Hi! I'm SmartTour's AI Assistant 🤖 I can help you discover tours, plan trips, and answer questions. What are you looking for?";

const QUICK_REPLIES = [
  "Find a safari",
  "Best beaches",
  "Plan my trip",
  "How to book?",
  "Talk to support",
];

function getReply(text) {
  const q = text.toLowerCase();

  if (/(safari|serengeti|wildlife|animals|lion|migration)/.test(q))
    return "For wildlife, the Serengeti Safari Adventure is our top pick (4.8★). Head to the Tours page and filter by 'Safari' to see all options and live prices in TZS.";

  if (/(beach|zanzibar|ocean|sea|coast|island)/.test(q))
    return "Zanzibar is paradise! Try the 'Zanzibar Beach Escape' or browse Destinations for beaches & resorts. Most beach tours start from ~Tsh 1,247,500.";

  if (/(kilimanjaro|climb|hike|mountain|trek)/.test(q))
    return "The 'Mount Kilimanjaro Trek' (4.9★) is a bucket-list adventure. Check Tours → Adventure for the full itinerary and requirements.";

  if (/(plan|itinerary|trip|schedule|days)/.test(q))
    return "Use our Trip Planner to build a custom day-by-day plan — just tell it your interests, budget, and dates. Open it from the nav menu under 'Planner'.";

  if (/(book|booking|reserve|pay|payment)/.test(q))
    return "To book: open a tour, tap 'Book Now', sign in, and confirm your details. You can review everything under 'My Bookings' afterwards.";

  if (/(price|cost|budget|how much|expensive|tzs|shilling)/.test(q))
    return "Prices are shown in Tanzanian Shillings (TZS). Safari ~Tsh 1,997,500, Beach ~Tsh 1,247,500, Kilimanjaro ~Tsh 3,000,000. Filter Tours by category to compare.";

  if (/(contact|support|help|human|agent|talk)/.test(q))
    return "Our team is here for you! Email support@smarttour.co.tz, WhatsApp +255 712 345 678, or scroll to the Contacts section on the homepage.";

  if (/(hello|hi|hey|yo|greet)/.test(q))
    return "Hello! 👋 Tell me what kind of Tanzanian experience you're dreaming of — safari, beach, mountain, or a custom plan?";

  return "I can help with tours, destinations, trip planning, bookings, and support. Try one of the quick options below, or ask me anything about traveling in Tanzania!";
}

function AiAssistant() {
  const { open, closeAssistant } = useAssistant();
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([{ from: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = getReply(text);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 650 + Math.random() * 500);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm rounded-[28px] border shadow-2xl overflow-hidden flex flex-col h-[70vh] max-h-[560px] ${
        isDark ? "bg-slate-900/95 border-slate-700/60 shadow-emerald-950/20" : "bg-white/95 border-gray-200/70 shadow-gray-900/10"
      } backdrop-blur-xl`}
    >
      {/* Header */}
      <div className="relative flex items-center gap-3 px-5 py-3.5 overflow-hidden rounded-t-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.35),transparent_35%)]" />
        <div className="pointer-events-none absolute -inset-10 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.18),transparent,rgba(6,182,212,0.18),transparent)] opacity-70 animate-[spin_6s_linear_infinite]" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/25 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md overflow-hidden">
          <img src="/rafiki.png" alt="RafikiChat" className="h-full w-full object-cover p-0.5" />
        </div>
        <div className="relative flex-1">
          <p className="font-extrabold text-sm tracking-tight">RafikiChat</p>
          <p className="text-[11px] text-emerald-100 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-300 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            Online · here to help
          </p>
        </div>
        <button
          onClick={closeAssistant}
          className="relative z-10 p-2 rounded-xl hover:bg-white/20 transition active:scale-95 cursor-pointer"
          aria-label="Close assistant"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === "user"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl rounded-br-md"
                    : isDark
                    ? "bg-slate-800/80 text-slate-100 rounded-2xl rounded-bl-md border border-slate-700/60 backdrop-blur-md"
                    : "bg-white/80 text-gray-800 rounded-2xl rounded-bl-md border border-gray-200/70 backdrop-blur-md shadow-sm"
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className={`px-4 py-3 rounded-2xl backdrop-blur-md border ${
                isDark ? "bg-slate-800/70 border-slate-700/50" : "bg-white/70 border-gray-200/60"
              }`}>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick replies */}
      <div className="px-4 pb-2 flex flex-wrap gap-2">
        {QUICK_REPLIES.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition active:scale-95 ${
              isDark
                ? "border-slate-700 text-emerald-300 hover:bg-slate-800"
                : "border-gray-200 text-emerald-700 hover:bg-green-50"
            }`}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="p-3 border-t flex items-center gap-2 bg-white/50 dark:bg-slate-900/50"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className={`flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
            isDark ? "bg-slate-800 border border-slate-700 text-white placeholder-gray-500" : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400"
          }`}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/30 transition active:scale-95"
          aria-label="Send"
        >
          <FaPaperPlane className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default AiAssistant;
