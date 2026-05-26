"use client";

import { useState } from "react";
import { MessageSquare, BookOpen, Brain, Loader2 } from "lucide-react";

export default function AIChat() {
  const [type, setType] = useState("doubt");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          prompt,
        }),
      });

      const data = await res.json();

      setResponse(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f5e9] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-green-100 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            AI Learning Assistant
          </h1>

          <p className="text-gray-500 mt-2">
            Ask doubts, generate summaries and quizzes instantly.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setType("doubt")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition ${
              type === "doubt"
                ? "bg-green-500 text-white"
                : "bg-green-50 text-gray-700"
            }`}
          >
            <MessageSquare size={18} />
            Doubt
          </button>

          <button
            onClick={() => setType("summary")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition ${
              type === "summary"
                ? "bg-green-500 text-white"
                : "bg-green-50 text-gray-700"
            }`}
          >
            <BookOpen size={18} />
            Summary
          </button>

          <button
            onClick={() => setType("quiz")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition ${
              type === "quiz"
                ? "bg-green-500 text-white"
                : "bg-green-50 text-gray-700"
            }`}
          >
            <Brain size={18} />
            Quiz
          </button>
        </div>

        {/* Input */}
        <textarea
          rows={8}
          placeholder={`Enter your ${type} request here...`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border border-green-200 rounded-2xl p-5 outline-none focus:ring-2 focus:ring-green-400 resize-none text-gray-700"
        />

        {/* Button */}
        <div className="mt-5">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 transition text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}

            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Response */}
        <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-6 min-h-[200px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Response</h2>

          <div className="text-gray-700 whitespace-pre-wrap leading-7">
            {response || "Your AI response will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
