import { useState, useRef, useEffect } from "react";
import { Mic, Send, X, Bot, MessageCircle } from "lucide-react";
import api from "../services/api";

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hi 👋 I can answer medical questions or help you book an appointment.\nYou can type or speak 🎤",
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const messagesEndRef = useRef(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= VOICE INPUT ================= */
  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    setListening(true);

    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  /* ================= SEND MESSAGE ================= */
  const send = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((m) => [...m, { from: "user", text: userText }]);

    try {
      const res = await api.post("/ai/chat", { message: userText });

      /* ---------- NORMAL CHAT ---------- */
      if (res.data.type === "chat") {
        setMessages((m) => [...m, { from: "bot", text: res.data.reply }]);
        return;
      }

      /* ---------- BOOKING FLOW ---------- */
      if (res.data.type === "booking") {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: `I found doctors for **${res.data.specialization}**.\nSelect one to book:`,
            doctors: res.data.doctors,
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "⚠️ Sorry, I couldn't process that right now.",
        },
      ]);
    }
  };

  return (
    <>
      {/* ================= FLOATING BUTTON ================= */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
                   bg-accent text-black flex items-center justify-center 
                   shadow-xl animate-spin-slow"
      >
        <MessageCircle size={20} />
      </button>

      {/* ================= CHAT PANEL ================= */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[400px] h-[520px] max-h-[70vh]
                     bg-slate-900 border border-slate-800
                     rounded-2xl shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-800">
            <h3 className="font-semibold flex items-center gap-2">
              <Bot size={18} className="text-accent" />
              MediSlot AI Assistant
            </h3>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm ${
                  m.from === "user"
                    ? "text-right text-accent"
                    : "text-left text-white"
                }`}
              >
                <p className="whitespace-pre-line mb-2">{m.text}</p>

                {/* ================= DOCTOR CAROUSEL ================= */}
                {m.doctors && (
                  <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-3">
                    <p className="text-xs text-muted mb-2">
                      Matched doctors
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2 pr-1">
                      {m.doctors.map((d) => (
                        <div
                          key={d._id}
                          onClick={() =>
                            (window.location.href = `/book/${d._id}`)
                          }
                          className="min-w-[220px] bg-slate-800
                                     border border-slate-700 rounded-xl
                                     p-3 cursor-pointer hover:border-accent
                                     transition"
                        >
                          <h4 className="font-semibold text-sm">
                            Dr. {d.name}
                          </h4>

                          <p className="text-xs text-accent mt-1">
                            {d.specialization}
                          </p>

                          <p className="text-xs text-muted mt-1">
                            🏥 {d.hospital_name}
                          </p>

                          <p className="text-sm font-medium mt-2">
                            💰 Fee: ₹{d.hospital_fee}
                          </p>

                          <button
                            className="mt-3 w-full bg-accent text-black
                                       text-xs py-2 rounded-lg font-semibold"
                          >
                            Book Appointment
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t border-slate-800">
            <button
              onClick={startVoice}
              className={`p-2 rounded-lg ${
                listening ? "bg-red-500" : "bg-slate-800"
              }`}
            >
              <Mic size={16} />
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Describe your problem..."
              className="flex-1 bg-slate-800 rounded-lg px-3
                         text-sm outline-none"
            />

            <button
              onClick={send}
              className="p-2 bg-accent text-black rounded-lg"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
