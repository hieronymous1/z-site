"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Lightbulb, TrendingUp, Home, MapPin, Mic } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello — I'm Z3's AI assistant. I can help you find properties, analyse market trends, and surface investment insights across the UAE. What are you looking for?",
    timestamp: "Just now",
  },
];

const SUGGESTIONS = [
  { icon: Home,       text: "Find 2BR apartments in Dubai Marina under 2M AED" },
  { icon: TrendingUp, text: "Show rental yield trends for JVC" },
  { icon: MapPin,     text: "Compare properties near Metro stations" },
  { icon: Lightbulb,  text: "Best areas to invest in 2026" },
];

interface AIChatPanelProps {
  mode?: "buy" | "rent";
}

export default function AIChatPanel({ mode = "buy" }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const accentColor = mode === "buy" ? "#A5FFD6" : "#A96DA3";
  const accentBg    = mode === "buy" ? "rgba(165,255,214,0.10)" : "rgba(169,109,163,0.12)";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: "Just now" };
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `I found several options matching "${input}". Relevant properties are now highlighted on the map — click any marker to view full details.`,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <section className="ai-agent">

      {/* ── Header ── */}
      <header className="ai-agent__header">
        <div className="ai-agent__avatar" style={{ background: accentBg }}>
          <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
        </div>

        <div>
          <h2 className="type-label" style={{ fontFamily: "var(--font-display)" }}>
            Z3 Assistant
          </h2>
          <p className="type-body-sm">Powered by real-time market data</p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-subtle" style={{ background: accentColor }} />
          <span className="text-[11px]" style={{ color: accentColor }}>Online</span>
        </div>
      </header>

      {/* ── Messages ── */}
      <div className="ai-agent__messages">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`ai-agent__message ${isUser ? "ai-agent__message--user" : ""}`}>
              {/* Avatar icon */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={!isUser
                  ? { background: accentBg }
                  : { background: "rgba(238,229,233,0.07)", border: "1px solid rgba(238,229,233,0.10)" }}
              >
                {!isUser
                  ? <Bot  className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  : <User className="w-3.5 h-3.5" style={{ color: "var(--color-z3-text-secondary)" }} />}
              </div>

              {/* Bubble */}
              <div
                className={`ai-agent__bubble ${isUser ? "ai-agent__bubble--user" : ""}`}
                style={isUser ? { background: accentBg, borderColor: `${accentColor}28` } : undefined}
              >
                <p className="text-sm leading-relaxed text-z3-text">{msg.content}</p>
                <span className="type-body-sm mt-1 block">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

        {/* ── Quick suggestions (shown until user types) ── */}
        {messages.length <= 1 && (
          <div className="space-y-2 pt-2">
            <p className="type-label-mono">Try asking</p>
            {SUGGESTIONS.map(({ icon: Icon, text }) => (
              <button
                key={text}
                onClick={() => setInput(text)}
                className="ai-agent__suggestion"
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-z3-text-muted" />
                <span>{text}</span>
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <footer className="panel__footer">
        <div className="ai-agent__input-bar">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about properties, trends, areas…"
            className="ai-agent__input"
          />

          <button className="btn-icon" aria-label="Voice input">
            <Mic className="w-4 h-4" />
          </button>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="btn-icon"
            style={input.trim()
              ? { background: "linear-gradient(135deg, #A5FFD6 0%, #C8FFE7 100%)", color: "#12130F" }
              : undefined}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </footer>

    </section>
  );
}
