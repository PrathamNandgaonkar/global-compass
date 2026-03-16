import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatMessages, suggestedPrompts, aiResponses } from "@/data/mockData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = "That's a great question! Based on our data, I'd recommend exploring the country profiles in our Explore section for detailed information. You can also use the Compare tool to evaluate multiple countries side by side.";
      if (lower.includes("germany") || lower.includes("engineer")) response = aiResponses.germany;
      else if (lower.includes("easiest") || lower.includes("pr") || lower.includes("permanent")) response = aiResponses.easiest;
      else if (lower.includes("cost") || lower.includes("lisbon") || lower.includes("berlin")) response = aiResponses.cost;
      else if (lower.includes("remote") || lower.includes("freelanc")) response = aiResponses.remote;
      else if (lower.includes("canada") || lower.includes("express")) response = aiResponses.canada;
      else if (lower.includes("nomad") || lower.includes("digital")) response = aiResponses.nomad;

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 800);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex h-[calc(100vh-3.5rem)] max-w-3xl flex-col px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="mb-1 text-2xl font-bold text-foreground">AI Relocation Advisor</h1>
          <p className="mb-4 text-sm text-muted-foreground">Ask anything about immigration, visas, and relocation</p>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto pb-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" strokeWidth={1.5} />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-card-foreground"
              }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Suggested prompts */}
        {messages.length <= 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {suggestedPrompts.map(prompt => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 border-t border-border pt-4">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(input)}
            placeholder="Ask about immigration, visas, cost of living..."
            className="flex-1"
          />
          <Button size="icon" onClick={() => send(input)}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
