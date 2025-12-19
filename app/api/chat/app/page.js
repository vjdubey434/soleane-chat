"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.reply },
    ]);

    setLoading(false);
  }

  return (
    <main style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Soleane Candles Assistant</h1>

      <div style={{ marginBottom: 20 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about Soleane candles..."
        style={{ width: "100%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        Send
      </button>
    </main>
  );
}
