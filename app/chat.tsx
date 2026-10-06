"use client";

import { useEffect, useRef, useState } from "react";
import { retort } from "@/lib/retort";

const THINKING_MIN_MS = 800;
const THINKING_MAX_MS = 2000;
const WORD_INTERVAL_MS = 120;

type Message = { role: "user" | "bot"; text: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bottom = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const busy = thinking || streaming;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  function ask(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;

    const question = input;
    const words = retort(question).split(" ");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setThinking(true);

    const thinkingMs = THINKING_MIN_MS + Math.random() * (THINKING_MAX_MS - THINKING_MIN_MS);
    timers.current.push(
      setTimeout(() => {
        setThinking(false);
        setStreaming(true);
        setMessages((prev) => [...prev, { role: "bot", text: "" }]);

        words.forEach((_, i) => {
          timers.current.push(
            setTimeout(() => {
              const text = words.slice(0, i + 1).join(" ");
              setMessages((prev) => [...prev.slice(0, -1), { role: "bot", text }]);
              if (i === words.length - 1) setStreaming(false);
            }, i * WORD_INTERVAL_MS),
          );
        });
      }, thinkingMs),
    );
  }

  return (
    <div className="flex flex-1 flex-col w-full max-w-2xl mx-auto px-4">
      <header className="py-4 text-center font-semibold tracking-tight">Bastard-AI</header>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-4">
        {messages.length === 0 && !busy && (
          <p className="m-auto text-zinc-500">Ask me anything.</p>
        )}
        {messages.map((message, i) => (
          <div
            key={i}
            className={
              message.role === "user"
                ? "self-end max-w-[80%] rounded-2xl bg-zinc-200 px-4 py-2 dark:bg-zinc-800"
                : "self-start max-w-[80%] px-1 py-2"
            }
          >
            {message.text}
          </div>
        ))}
        {thinking && <div className="self-start px-1 py-2 text-zinc-500 animate-pulse">Thinking…</div>}
        <div ref={bottom} />
      </div>

      <form onSubmit={ask} className="sticky bottom-0 flex gap-2 bg-background py-4">
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={busy}
          placeholder={busy ? "" : "Ask a question"}
          aria-label="Your question"
          className="flex-1 rounded-full border border-zinc-300 bg-transparent px-4 py-2 outline-none focus:border-zinc-500 disabled:opacity-50 dark:border-zinc-700"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-foreground px-5 py-2 text-background disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
