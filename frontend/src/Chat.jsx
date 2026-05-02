import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, SpinnerIcon } from './Icons';

const SCENARIOS = [
  {
    keywords: ['missing', 'not on', 'list', 'roll', 'name not', 'not found', 'deleted'],
    response: `Don't panic! If your name is missing from the Electoral Roll on polling day:\n\n**Step 1:** Immediately ask the Presiding Officer for a **Tender Ballot** (not to be confused with a normal ballot). You have the right to cast a tender vote if you believe your name has been wrongly deleted.\n\n**Step 2:** Alternatively, approach the BLO (Booth Level Officer) or the Sector Officer at your booth — they carry mobile devices with the final roll and can help.\n\n**To prevent this in future:**\n• Verify your enrolment at **electoralsearch.eci.gov.in** 4–6 weeks before polling day.\n• If name is wrong, file **Form 8** (correction) on **voters.eci.gov.in**.\n• Call the National Voter Helpline: **1950**\n\n⚠️ Names can be deleted if you moved without updating your address (file Form 8A) or if there's a duplicate entry (file Form 7 to report). Always check early!`,
  },
  {
    keywords: ['forgot id', 'lost id', 'no id', 'without id', 'epic', 'voter id', 'identity'],
    response: `Forgot your Voter ID (EPIC card)? You can still vote using **11 alternative photo IDs** approved by the ECI:\n\n**Accepted alternatives:**\n✅ Aadhaar Card\n✅ MNREGA Job Card\n✅ Passbooks with photo (issued by Bank/Post Office)\n✅ Health Insurance Smart Card (Labour Ministry)\n✅ Driving Licence\n✅ PAN Card\n✅ Indian Passport\n✅ Service Photo ID cards (Central/State Govt / PSU)\n✅ Pension documents with photograph\n✅ NPR Smart Card\n✅ Disability Certificate (Unique) with photo\n\n💡 **Important:** All these must be **original** documents — photocopies are not accepted.`,
  },
  {
    keywords: ['postal ballot', 'vote from home', 'home voting', 'absentee', 'mail vote', 'service voter'],
    response: `India has **Postal Ballot** as the equivalent of mail-in voting. Here's who qualifies:\n\n**Who can use Postal Ballot:**\n• Members of Armed Forces and their spouses (Service Voters)\n• Government employees posted outside their constituency\n• Persons with disabilities (PwD) — 40%+ disability\n• Senior citizens aged 85 and above\n• COVID-positive/quarantined voters\n• Election duty personnel\n\n**How it works:**\n1. Apply using **Form 12D** at your ERO office\n2. The Returning Officer sends you a ballot pack by post\n3. Fill it out and return it by post or submit in person before counting begins\n\n📞 Contact your **Electoral Registration Officer (ERO)** or call **1950** for details specific to your constituency.`,
  },
  {
    keywords: ['evm', 'machine', 'broken', 'not working', 'error', 'malfunction'],
    response: `If the EVM (Electronic Voting Machine) appears to malfunction:\n\n**Step 1:** Immediately inform the **Presiding Officer** at the polling booth — don't try to fix it yourself.\n\n**Step 2:** The Presiding Officer has authority to replace a faulty EVM. Voting is halted only until the replacement machine is set up.\n\n**Step 3:** If you suspect the EVM recorded a wrong vote — check the **VVPAT slip** that appears in the transparent window for 7 seconds. It shows the candidate's name and symbol.\n\n**Step 4:** If you're unsatisfied, file a complaint via the **cVIGIL app** or call **1950**.\n\n💡 Indian EVMs are standalone machines with no internet/Bluetooth connectivity — they cannot be hacked remotely.`,
  },
  {
    keywords: ['register', 'enrol', 'enroll', 'apply voter', 'voter id', 'epic card', 'new voter', 'form 6'],
    response: `Enrolling as a voter in India is straightforward! Here's how:\n\n**Online (Recommended):**\n1. Go to **voters.eci.gov.in** or download the **Voter Helpline App**\n2. Click "New Registration"\n3. Fill **Form 6** with your name, DOB, address\n4. Upload Aadhaar / proof of age / proof of address + photo\n5. Submit — you'll get an Application Reference Number\n6. BLO may visit for field verification\n7. EPIC card is dispatched to your address in 2–4 weeks\n\n**Documents needed:**\n• Proof of Age: Aadhaar, Birth Certificate, Class X marksheet\n• Proof of Address: Aadhaar, Passport, utility bill\n• Passport-size photograph\n\n⏰ **Minimum age:** 18 years as of January 1 of the qualifying year\n\n📞 Helpline: **1950** | Website: **voters.eci.gov.in**`,
  },
  {
    keywords: ['address change', 'moved', 'shifted', 'new address', 'transfer', 'form 8'],
    response: `Moved to a new address? You must update your voter registration — your old entry won't work at a different booth!\n\n**If you moved within the same constituency:**\nFile **Form 8** (correction of entries) on voters.eci.gov.in.\n\n**If you moved to a different constituency:**\nFile **Form 8A** (transposition of name) — your name moves from old roll to new roll automatically.\n\n**Documents:**\n• New proof of address (Aadhaar / utility bill / rent agreement)\n• Your EPIC number\n\n**Timeline:** Submit at least 2 months before polling day — rolls are frozen before elections.\n\n💡 You can update online at **voters.eci.gov.in** or visit your nearest BLO/ERO office.`,
  },
  {
    keywords: ['booth', 'polling station', 'find booth', 'where to vote', 'polling place'],
    response: `Finding your polling booth in India is easy:\n\n**Option 1 — Electoral Search Portal (Fastest):**\nVisit **electoralsearch.eci.gov.in** → Enter your name, state, assembly constituency, and date of birth → Your **Polling Station Name, Number, and Address** appear.\n\n**Option 2 — Voter Helpline App:**\nOpen the app → "My Voter ID" section → Your booth details and location map are shown.\n\n**Option 3 — Check Your EPIC Card:**\nYour Voter ID card has your **Part Number** and **Booth Number** printed on it.\n\n**Option 4 — Call 1950:**\nNational Voter Helpline operates in multiple languages.\n\n💡 On polling day, the **Suvidha app** shows live queue wait times at your booth so you can pick the right time to go!`,
  },
  {
    keywords: ['complaint', 'bribe', 'money', 'coercion', 'threat', 'violation', 'malpractice', 'cvigil'],
    response: `Witnessed an election violation? Report it immediately!\n\n**Use cVIGIL App (ECI's Official Reporting Tool):**\n1. Download **cVIGIL** from Google Play / App Store\n2. Take a photo/video of the violation\n3. Submit with your location — it's geotagged\n4. A flying squad from your district election office responds within **100 minutes**\n5. You get an action-taken report\n\n**Common violations to report:**\n🚫 Distribution of cash or gifts for votes\n🚫 Use of government vehicles for campaigning\n🚫 Voter intimidation or threats\n🚫 Violation of Model Code of Conduct\n🚫 Alcohol/liquor distribution\n\n📞 You can also call: **1950** or your District Collector's election control room.\n\n✅ Complaints are anonymous — your identity is protected.`,
  },
];

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

function findResponse(q) {
  const lower = q.toLowerCase();
  for (const s of SCENARIOS) { if (s.keywords.some(k => lower.includes(k))) return s.response; }
  return null;
}

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
    text: `Hello ${user?.name?.split(' ')[0] || 'there'}! I'm CivIQ's AI assistant — your guide to India's election process.\n\nI can answer questions about Voter ID enrolment, finding your polling booth, EVM issues, postal ballot, filing complaints, and more!\n\nTry one of the quick questions below, or type your own.`,
  }]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  const send = (text) => {
    const q = (text || input).trim(); if (!q) return;
    setMessages(prev => [...prev, { id:Date.now(), sender:'user', text:q }]);
    setInput(''); setLoading(true);
    setTimeout(() => {
      const ai = findResponse(q)
        || `That's a great question! For the most accurate answer about **"${q}"**, I recommend:\n\n🌐 **voters.eci.gov.in** — Official Voter Portal\n🔍 **electoralsearch.eci.gov.in** — Check your name on the roll\n📞 **Helpline 1950** — Free national voter helpline in multiple languages\n📱 **Voter Helpline App** — Available on Android & iOS\n\nIs there anything else I can help with? Try asking about Voter ID enrolment, polling booth location, or how to file an election complaint!`;
      setMessages(prev => [...prev, { id:Date.now()+1, sender:'ai', text:ai }]);
      setLoading(false);
    }, 900 + Math.random()*600);
  };

  return (
    <div className="chat-layout">
      <div style={{ padding:'16px 24px', flexShrink:0, background:'linear-gradient(135deg,#7c1d0a,#046a38)', display:'flex', alignItems:'center', gap:'14px' }}>
        <div style={{ width:'46px', height:'46px', borderRadius:'14px', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', flexShrink:0 }}>🤖</div>
        <div>
          <h2 style={{ fontSize:'17px', fontWeight:800, color:'#fff', marginBottom:'2px' }}>CivIQ Assistant</h2>
          <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 6px rgba(74,222,128,0.6)' }} />
            <span style={{ fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.7)' }}>Online — Indian election expert 🇮🇳</span>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:'16px' }} className="no-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} style={{ display:'flex', justifyContent:msg.sender==='user'?'flex-end':'flex-start', gap:'10px', alignItems:'flex-end' }}>
            {msg.sender === 'ai' && (
              <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'rgba(79,70,229,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>🤖</div>
            )}
            <div className={msg.sender==='user'?'bubble-user':'bubble-ai'} style={{ maxWidth:'min(85%, 520px)', padding:'14px 18px', fontSize:'14px', lineHeight:1.75 }}>
              {renderText(msg.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:'flex', gap:'10px', alignItems:'flex-end' }}>
            <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'rgba(79,70,229,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>🤖</div>
            <div className="bubble-ai" style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:'8px' }}>
              <SpinnerIcon /><span style={{ fontSize:'13px', color:'#918fa1' }}>Thinking…</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ padding:'8px 16px 4px', flexShrink:0, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'8px' }} className="no-scrollbar">
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => send(q)} className="chip" style={{ whiteSpace:'nowrap', fontSize:'12px', padding:'7px 14px' }}>{q}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:'12px 16px 16px', flexShrink:0, background:'rgba(11,19,38,0.95)' }}>
        <form onSubmit={e => { e.preventDefault(); send(); }} style={{ display:'flex', gap:'10px', alignItems:'center' }}>
          <input
            className="input-glass"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything about voting in India…"
            disabled={loading}
            style={{ borderRadius:'9999px', padding:'14px 20px', fontSize:'15px' }}
          />
          <button type="submit" disabled={!input.trim()||loading} style={{ width:'52px', height:'52px', borderRadius:'50%', flexShrink:0, border:'none', cursor:'pointer', background:input.trim()?'linear-gradient(135deg,#ff671f,#046a38)':'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.2s', boxShadow:input.trim()?'0 4px 15px rgba(255,103,31,0.4)':'none' }}>
            <SendIcon size={18} style={{ color:input.trim()?'#fff':'#464555', transform:'rotate(45deg)' }} />
          </button>
        </form>
      </div>
    </div>
  );
}
