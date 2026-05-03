import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { sanitizeInput } from '../utils/security';
import { auth } from '../firebaseConfig';

const QUICK_QUESTIONS = [
  "My name is not on the voter list!",
  "I forgot my Voter ID card",
  "How do I apply for Postal Ballot?",
  "The EVM is not working",
  "How do I enrol as a new voter?",
  "I moved to a new address",
  "How do I find my polling booth?",
  "How to report an election violation?",
];

function renderText(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((p, i) => i % 2 === 1
    ? <strong key={i} className="font-bold text-white">{p}</strong>
    : p.split('\n').map((line, j, arr) => (
        <React.Fragment key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </React.Fragment>
      ))
  );
}

export default function Chat({ user }) {
  const [messages, setMessages] = useState([{
    id: 1, 
    sender: 'ai',
    text: `Hello ${user?.name?.split(' ')[0] || 'there'}! I'm CivIQ's AI assistant — your guide to India's election process.\n\nI can answer questions about Voter ID enrolment, finding your polling booth, EVM issues, postal ballot, filing complaints, and more! Ask me anything, even in regional languages.\n\nTry one of the quick questions below, or type your own.`,
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages]);

  const toggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser. Please try Chrome.");
      return;
    }
    
    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  const send = async (text) => {
    const q = sanitizeInput((text || input).trim()); 
    if (!q) return;
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: q }]);
    setInput(''); 
    setLoading(true);
    
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: q, language: "en" })
      });
      
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: `⚠️ Error connecting to server. Please try again later.` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-layout animate-fade-in" role="main" aria-label="CivIQ AI Assistant">
      <header className="chat-header">
        <div className="chat-bot-avatar" aria-hidden="true">🤖</div>
        <div>
          <h2 className="chat-header-title">CivIQ AI Assistant</h2>
          <div className="chat-status">
            <div className="status-dot" aria-hidden="true" />
            <span className="status-text">Ready to help 🇮🇳</span>
          </div>
        </div>
      </header>

      <section 
        className="chat-messages no-scrollbar" 
        aria-live="polite" 
        aria-label="Message history"
      >
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`message-row ${msg.sender}`}
          >
            {msg.sender === 'ai' && (
              <div className="message-avatar" aria-hidden="true">🤖</div>
            )}
            <div className={`bubble-${msg.sender}`}>
              {renderText(msg.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message-row ai">
            <div className="message-avatar" aria-hidden="true">🤖</div>
            <div className="bubble-ai">
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm opacity-70">Thinking…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </section>

      <footer className="chat-footer">
        <div className="quick-questions no-scrollbar" aria-label="Quick questions">
          {QUICK_QUESTIONS.map((q, i) => (
            <button 
              key={i} 
              onClick={() => send(q)} 
              className="chip"
            >
              {q}
            </button>
          ))}
        </div>
        <form 
          className="chat-input-container"
          onSubmit={e => { e.preventDefault(); send(); }}
        >
          <button 
            type="button" 
            onClick={toggleVoice}
            className={`voice-btn ${isListening ? 'active' : ''}`}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            className="input-glass"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask about voting in India..."}
            disabled={loading}
            aria-label="Type your message"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading} 
            className={`send-btn ${input.trim() ? 'active' : ''}`}
            aria-label="Send message"
          >
            <Send size={18} className={input.trim() ? '' : 'opacity-30'} />
          </button>
        </form>
      </footer>
    </div>
  );
}
