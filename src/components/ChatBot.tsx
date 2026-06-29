"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const QUICK_STARTS = [
  "What cookies do you have?",
  "How do I order?",
  "When's your next pop-up?",
];

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi there! 🍪 I'm the Sweet Home MN assistant. Ask me anything about our cookies, cupcakes, pop-up schedule, or how to place a custom order!",
};

export default function ChatBot() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<Message[]>([WELCOME]);
  const [input, setInput]         = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef                 = useRef<HTMLDivElement>(null);
  const inputRef                  = useRef<HTMLInputElement>(null);
  const abortRef                  = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return;

      const userMessage: Message = { role: "user", content: text.trim() };
      const history = [...messages, userMessage];
      setMessages(history);
      setInput("");
      setStreaming(true);

      // Placeholder assistant message
      const placeholder: Message = { role: "assistant", content: "", streaming: true };
      setMessages([...history, placeholder]);

      abortRef.current = new AbortController();

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok || !response.body) throw new Error("Stream failed");

        const reader  = response.body.getReader();
        const decoder = new TextDecoder();
        let accum     = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") break;
            try {
              const parsed = JSON.parse(payload);
              if (parsed.text) {
                accum += parsed.text;
                setMessages([
                  ...history,
                  { role: "assistant", content: accum, streaming: true },
                ]);
              }
            } catch {
              // skip malformed chunks
            }
          }
        }

        setMessages([
          ...history,
          { role: "assistant", content: accum || "Sorry, I didn't catch that. Try again!" },
        ]);
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") {
          setMessages([
            ...history,
            {
              role: "assistant",
              content:
                "Sorry, something went wrong. Please check our Facebook page for the latest info!",
            },
          ]);
        }
      } finally {
        setStreaming(false);
      }
    },
    [messages, streaming]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-12 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #C87A14, #E8A820)",
          boxShadow: open
            ? "0 0 0 4px rgba(200,122,20,0.2), 0 8px 32px rgba(200,122,20,0.5)"
            : "0 0 24px rgba(200,122,20,0.35), 0 4px 16px rgba(0,0,0,0.5)",
        }}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" stroke="#0D0604" strokeWidth="2.5" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            <motion.span
              key="cookie"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl select-none"
              style={{ color: "#0D0604" }}
              aria-hidden="true"
            >
              🍪
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-32 right-6 z-[199] flex flex-col"
            style={{
              width: "min(380px, calc(100vw - 1.5rem))",
              height: "min(540px, calc(100dvh - 180px))",
              background: "#1A0A04",
              border: "1px solid rgba(200,122,20,0.25)",
              borderRadius: "1.25rem",
              boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,122,20,0.08)",
              overflow: "hidden",
            }}
            role="dialog"
            aria-label="Sweet Home MN Chat Assistant"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                borderBottom: "1px solid rgba(200,122,20,0.15)",
                background: "rgba(13,6,4,0.6)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                  style={{ background: "rgba(200,122,20,0.15)", border: "1px solid rgba(200,122,20,0.25)" }}
                  aria-hidden="true"
                >
                  🍪
                </div>
                <div>
                  <div
                    className="text-sm font-semibold leading-none"
                    style={{ color: "#F5ECD7", fontFamily: "var(--font-inter)" }}
                  >
                    Sweet Home MN Assistant
                  </div>
                  <div
                    className="text-[10px] mt-1 flex items-center gap-1"
                    style={{ color: "rgba(200,122,20,0.7)", fontFamily: "var(--font-inter)" }}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: "#4ade80" }}
                      aria-hidden="true"
                    />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ color: "rgba(245,236,215,0.5)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                aria-label="Close chat"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(200,122,20,0.3) transparent" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #C87A14, #E8A820)"
                          : "rgba(255,255,255,0.05)",
                      color: msg.role === "user" ? "#0D0604" : "#F5ECD7",
                      fontFamily: "var(--font-inter)",
                      borderRadius:
                        msg.role === "user"
                          ? "1.25rem 1.25rem 0.25rem 1.25rem"
                          : "1.25rem 1.25rem 1.25rem 0.25rem",
                      border: msg.role === "assistant" ? "1px solid rgba(200,122,20,0.1)" : "none",
                    }}
                  >
                    {msg.content || (msg.streaming ? (
                      <span className="flex gap-1 items-center py-1">
                        {[0, 1, 2].map((j) => (
                          <span
                            key={j}
                            className="inline-block w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "rgba(200,122,20,0.6)",
                              animation: `scroll-bounce 1.2s ease-in-out infinite`,
                              animationDelay: `${j * 0.2}s`,
                            }}
                            aria-hidden="true"
                          />
                        ))}
                      </span>
                    ) : "")}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick starts (only when no messages beyond welcome) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {QUICK_STARTS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={streaming}
                    className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
                    style={{
                      background: "rgba(200,122,20,0.1)",
                      color: "rgba(232,168,32,0.85)",
                      border: "1px solid rgba(200,122,20,0.2)",
                      fontFamily: "var(--font-inter)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,122,20,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,122,20,0.1)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
              style={{ borderTop: "1px solid rgba(200,122,20,0.12)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={streaming}
                placeholder="Ask about cookies, orders, schedule…"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{
                  color: "#F5ECD7",
                  fontFamily: "var(--font-inter)",
                  caretColor: "#C87A14",
                }}
                aria-label="Chat message input"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || streaming}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.12 }}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{
                  background: input.trim() && !streaming ? "#C87A14" : "rgba(200,122,20,0.2)",
                }}
                aria-label="Send message"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                    stroke={input.trim() && !streaming ? "#0D0604" : "rgba(200,122,20,0.6)"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
