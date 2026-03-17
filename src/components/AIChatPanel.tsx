"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Home, TrendingUp, MapPin, Lightbulb } from "lucide-react";

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
  const [input, setInput]       = useState("");
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: "Just now",
    };
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
    <section className="chat-panel">
      {/* Header */}
      <header className="chat-header">
        <span className="chat-header__title">Z3 AI</span>
        <span className="chat-header__badge">{mode === "buy" ? "Buy" : "Rent"}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-subtle"
            style={{ background: "var(--color-z3-accent)" }}
          />
        </div>
      </header>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`chat-msg ${isUser ? "chat-msg--user" : ""}`}>
              {!isUser && <div className="chat-msg__dot" />}
              <div className={`chat-bubble ${isUser ? "chat-bubble--user" : ""}`}>
                {msg.content}
                <div
                  className="type-body-sm mt-1"
                  style={{ fontFamily: "var(--font-display)", fontSize: 10, opacity: 0.5 }}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="chat-suggestion-row pt-2">
            <p className="type-label-mono" style={{ marginBottom: 4 }}>Try asking</p>
            {SUGGESTIONS.map(({ icon: Icon, text }) => (
              <button
                key={text}
                onClick={() => setInput(text)}
                className="chat-suggestion"
              >
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--color-z3-text-muted)" }} />
                <span>{text}</span>
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about properties, trends, areas…"
          className="chat-input"
        />
        <button className="btn-icon" aria-label="Voice input" style={{ width: 28, height: 28 }}>
          <Mic className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="chat-send-btn"
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
