import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, SpinnerIcon } from './Icons';

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
    ? <strong key={i} style={{ color:'#fff', fontWeight:700 }}>{p}</strong>
    : p.split('\n').map((line, j, arr) => <React.Fragment key={j}>{line}{j < arr.length - 1 && <br />}</React.Fragment>)
  );
}

export default function Chat({ user }) {
  const [messages, setMessages] = useState([{
    id: 1, sender: 'ai',
    text: `Hello ${user?.name?.split(' ')[0] || 'there'}! I'm CivIQ's AI assistant — your guide to India's election process.\n\nI can answer questions about Voter ID enrolment, finding your polling booth, EVM issues, postal ballot, filing complaints, and more! Ask me anything, even in regional languages.\n\nTry one of the quick questions below, or type your own.`,
  }]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  const send = async (text) => {
    const q = (text || input).trim(); 
    if (!q) return;
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: q }]);
    setInput(''); 
    setLoading(true);
    
    try {
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, language: "en" })
      });
      
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: data.reply }]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "I'm having trouble connecting to my servers right now. Please try again later or check **voters.eci.gov.in** in the meantime!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-layout" role="main" aria-label="Chat Interface">
      <header style={{ padding:'16px 24px', flexShrink:0, background:'linear-gradient(135deg,#7c1d0a,#046a38)', display:'flex', alignItems:'center', gap:'14px' }}>
        <div aria-hidden="true" style={{ width:'46px', height:'46px', borderRadius:'14px', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', flexShrink:0 }}>🤖</div>
        <div>
          <h2 style={{ fontSize:'17px', fontWeight:800, color:'#fff', marginBottom:'2px' }}>CivIQ Assistant</h2>
          <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
            <div aria-hidden="true" style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 6px rgba(74,222,128,0.6)' }} />
            <span style={{ fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.7)' }}>Online — Indian election expert 🇮🇳</span>
          </div>
        </div>
      </header>

      <section aria-live="polite" style={{ flex:1, overflowY:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:'16px' }} className="no-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} style={{ display:'flex', justifyContent:msg.sender==='user'?'flex-end':'flex-start', gap:'10px', alignItems:'flex-end' }}>
            {msg.sender === 'ai' && (
              <div aria-hidden="true" style={{ width:'32px', height:'32px', borderRadius:'10px', background:'rgba(79,70,229,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>🤖</div>
            )}
            <div className={msg.sender==='user'?'bubble-user':'bubble-ai'} style={{ maxWidth:'min(85%, 520px)', padding:'14px 18px', fontSize:'14px', lineHeight:1.75 }}>
              {renderText(msg.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:'flex', gap:'10px', alignItems:'flex-end' }}>
            <div aria-hidden="true" style={{ width:'32px', height:'32px', borderRadius:'10px', background:'rgba(79,70,229,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>🤖</div>
            <div className="bubble-ai" style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:'8px' }}>
              <SpinnerIcon /><span style={{ fontSize:'13px', color:'#918fa1' }}>Thinking…</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </section>

      <nav aria-label="Suggested Questions" style={{ padding:'8px 16px 4px', flexShrink:0, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'8px' }} className="no-scrollbar">
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => send(q)} aria-label={`Ask: ${q}`} className="chip" style={{ whiteSpace:'nowrap', fontSize:'12px', padding:'7px 14px' }}>{q}</button>
          ))}
        </div>
      </nav>

      <footer style={{ padding:'12px 16px 16px', flexShrink:0, background:'rgba(11,19,38,0.95)' }}>
        <form onSubmit={e => { e.preventDefault(); send(); }} style={{ display:'flex', gap:'10px', alignItems:'center' }}>
          <input
            className="input-glass"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything about voting in India…"
            aria-label="Message input"
            disabled={loading}
            style={{ borderRadius:'9999px', padding:'14px 20px', fontSize:'15px', flex:1 }}
          />
          <button type="submit" disabled={!input.trim()||loading} aria-label="Send message" style={{ width:'52px', height:'52px', borderRadius:'50%', flexShrink:0, border:'none', cursor:'pointer', background:input.trim()?'linear-gradient(135deg,#ff671f,#046a38)':'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.2s', boxShadow:input.trim()?'0 4px 15px rgba(255,103,31,0.4)':'none' }}>
            <SendIcon size={18} style={{ color:input.trim()?'#fff':'#464555', transform:'rotate(45deg)' }} />
          </button>
        </form>
      </footer>
    </div>
  );
}
