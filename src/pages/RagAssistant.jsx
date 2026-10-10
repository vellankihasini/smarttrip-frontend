
import { useState } from "react";
import { apiRequest } from "../Api";
import "./RagAssistant.css";

export default function RagAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendQuestion(e) {
    e.preventDefault();

    const text = question.trim();
    if (!text || loading) return;

    setMessages((old) => [...old, { role: "user", text }]);
    setQuestion("");
    setLoading(true);

    try {
      const data = await apiRequest("/rag/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      setMessages((old) => [
        ...old,
        {
          role: "assistant",
          text: data.answer || "I couldn't generate an answer.",
        },
      ]);
    } catch (err) {
      setMessages((old) => [
        ...old,
        {
          role: "assistant",
          text: err.message || "Unable to connect to SmartTrip AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = [
    "Plan a 3-day trip to Paris",
    "Suggest affordable places in Hyderabad",
    "How can I plan a trip on a ₹10,000 budget?",
  ];

  return (
    <main className="ai-page">
      <section className="ai-panel">
        <h1>SmartTrip AI ✨</h1>
        <p>Ask about destinations, activities, itineraries and budgets.</p>

        <div className="ai-suggestions">
          {suggestions.map((item) => (
            <button
              type="button"
              key={item}
              disabled={loading}
              onClick={() => setQuestion(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="ai-messages" aria-live="polite">
          {messages.length === 0 && (
            <p className="ai-welcome">
              Where would you like to travel? Tell me your destination,
              duration and budget to get started.
            </p>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`ai-message ${message.role}`}
            >
              <strong>
                {message.role === "user" ? "You" : "SmartTrip AI"}
              </strong>
              <p>{message.text}</p>
            </div>
          ))}

          {loading && <p>SmartTrip AI is thinking...</p>}
        </div>

        <form className="ai-form" onSubmit={sendQuestion}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything about your trip..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !question.trim()}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>
      </section>
    </main>
  );
}
