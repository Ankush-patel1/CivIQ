import React, { useState, useEffect } from 'react';

// Next Lok Sabha election: April–May 2029
const ELECTION_DATE = new Date('2029-04-15T07:00:00+05:30');

const EVENTS = [
  {
    date: 'Right Now',
    label: 'Do This Today',
    title: 'Verify Your Name on the Electoral Roll',
    desc: 'Check that your name, address, and date of birth are correct on the voter list at electoralsearch.eci.gov.in — takes 2 minutes.',
    type: 'action',
    href: 'https://electoralsearch.eci.gov.in',
    cta: 'Check My Name →',
  },
  {
    date: 'Year-Round',
    label: 'Open Now',
    title: 'New Voter Enrolment (Form 6)',
    desc: "Any Indian citizen who turned 18 can apply for a Voter ID year-round on voters.eci.gov.in. Special Summary Revision periods are held 3–4 times a year.",
    type: 'normal',
    href: 'https://voters.eci.gov.in',
    cta: 'Enrol Now →',
  },
  {
    date: '~2 Months Before Polling',
    label: 'Watch for ECI Notice',
    title: 'Enrolment Cutoff Deadline',
    desc: 'The ECI freezes the Electoral Roll about 2 months before polling day. If you miss this, you cannot vote in that election. Submit corrections (Form 8) before this date.',
    type: 'danger',
  },
  {
    date: '~1 Month Before Polling',
    label: 'Announced by ECI',
    title: 'Model Code of Conduct Kicks In',
    desc: 'Once ECI announces the election schedule, the Model Code of Conduct (MCC) is enforced. Political parties and governments face restrictions on new policy announcements.',
    type: 'warning',
  },
  {
    date: 'Polling Day',
    label: '7 AM – 6 PM',
    title: '🗳️ Polling Day',
    desc: 'Go to your designated polling booth with a valid photo ID. Press the EVM button next to your candidate. The VVPAT confirms your choice. If you are in queue at closing time, you MUST be allowed to vote.',
    type: 'critical',
  },
  {
    date: '1–3 Days After Polling',
    label: 'Counting Day',
    title: 'Vote Counting & Results',
    desc: 'EVM memory units are unsealed and counting begins at counting centres. Results are published live at results.eci.gov.in. Winning candidate is declared by Returning Officer.',
    type: 'info',
    href: 'https://results.eci.gov.in',
    cta: 'ECI Results Portal →',
  },
  {
    date: 'Weeks After Results',
    label: 'Formation of Govt',
    title: 'Oath-Taking & Government Formation',
    desc: 'The President (Lok Sabha) or Governor (Vidhan Sabha) invites the winning party/alliance to form government. Prime Minister or Chief Minister is sworn in.',
    type: 'info',
  },
];

export default function Timeline() {
  const [countdown, setCountdown] = useState({ days:0, hours:0, minutes:0, seconds:0 });

  useEffect(() => {
    const tick = () => {
      const diff = ELECTION_DATE - new Date();
      if (diff <= 0) { setCountdown({ days:0, hours:0, minutes:0, seconds:0 }); return; }
      setCountdown({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  const typeStyle = (t) => ({
    danger:   { borderColor:'rgba(248,113,113,0.30)', bg:'rgba(239,68,68,0.08)',  badgeCls:'badge-danger',  dotColor:'#ef4444' },
    warning:  { borderColor:'rgba(250,204,21,0.25)',  bg:'rgba(234,179,8,0.07)',  badgeCls:'badge-warning', dotColor:'#eab308' },
    critical: { borderColor:'rgba(248,113,113,0.50)', bg:'rgba(239,68,68,0.12)', badgeCls:'badge-danger',  dotColor:'#ef4444', glow:true },
    action:   { borderColor:'rgba(195,192,255,0.35)', bg:'rgba(79,70,229,0.12)', badgeCls:'badge-active',  dotColor:'#4f46e5' },
    info:     { borderColor:'rgba(137,206,255,0.18)', bg:'rgba(14,165,233,0.06)', badgeCls:'badge-locked', dotColor:'#464555' },
    normal:   { borderColor:'rgba(74,222,128,0.20)',  bg:'rgba(34,197,94,0.06)', badgeCls:'badge-completed', dotColor:'#4ade80' },
  }[t] || {});

  return (
    <div className="page-container">
      <div style={{ marginBottom:'24px' }}>
        <h1 style={{ fontSize:'clamp(24px, 4vw, 36px)', fontWeight:900, color:'#fff', marginBottom:'6px' }}>
          Key Dates & Deadlines
        </h1>
        <p style={{ color:'#c7c4d8', fontSize:'16px', lineHeight:1.6 }}>
          Key milestones in India's election cycle. Missing the enrolment cutoff = missing your vote.
        </p>
      </div>

      {/* Countdown to Lok Sabha 2029 */}
      <div style={{
        background:'linear-gradient(135deg, #7c1d0a 0%, #c94b11 40%, #046a38 100%)',
        borderRadius:'28px', padding:'28px', marginBottom:'32px',
        boxShadow:'0 8px 40px rgba(201,75,17,0.35)',
      }}>
        <p style={{ fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.6)', letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:'6px', textAlign:'center' }}>
          🇮🇳 COUNTDOWN — LOK SABHA GENERAL ELECTION 2029
        </p>
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.5)', fontSize:'12px', marginBottom:'18px' }}>
          (Approximate date — actual schedule to be announced by ECI)
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px' }}>
          {Object.entries(countdown).map(([unit, val]) => (
            <div key={unit} style={{ textAlign:'center', background:'rgba(255,255,255,0.12)', borderRadius:'16px', padding:'16px 8px' }}>
              <span style={{ display:'block', fontSize:'clamp(28px, 5vw, 40px)', fontWeight:900, color:'#fff', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
                {String(val).padStart(2,'0')}
              </span>
              <span style={{ display:'block', fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.55)', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:'6px' }}>
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Official links */}
      <div className="card" style={{ marginBottom:'28px', display:'flex', flexWrap:'wrap', gap:'10px', alignItems:'center' }}>
        <span style={{ fontSize:'13px', fontWeight:700, color:'#918fa1' }}>Official ECI Portals:</span>
        {[
          { label:'ECI Home',          href:'https://eci.gov.in' },
          { label:'Voter Portal',       href:'https://voters.eci.gov.in' },
          { label:'Electoral Search',   href:'https://electoralsearch.eci.gov.in' },
          { label:'Election Results',   href:'https://results.eci.gov.in' },
          { label:'Helpline: 1950',     href:'tel:1950' },
        ].map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:'13px', fontWeight:700, color:'#89ceff', textDecoration:'none', background:'rgba(14,165,233,0.10)', border:'1px solid rgba(137,206,255,0.20)', padding:'6px 14px', borderRadius:'9999px', transition:'background 0.2s' }}>
            {l.label} →
          </a>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ position:'relative', paddingLeft:'28px' }}>
        <div style={{ position:'absolute', left:'11px', top:0, bottom:0, width:'2px', background:'linear-gradient(to bottom, #ff671f, rgba(4,106,56,0.2))' }} />
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {EVENTS.map((evt, i) => {
            const s = typeStyle(evt.type);
            return (
              <div key={i} style={{ position:'relative' }}>
                <div style={{ position:'absolute', left:'-28px', top:'22px', width:'14px', height:'14px', borderRadius:'50%', background:s.dotColor||'#464555', border:'2px solid #0b1326', boxShadow:s.glow?`0 0 12px ${s.dotColor}`:'none' }} />
                <div style={{ borderRadius:'20px', padding:'20px', background:s.bg||'transparent', border:`1px solid ${s.borderColor||'rgba(255,255,255,0.08)'}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px', flexWrap:'wrap', gap:'8px' }}>
                    <span style={{ fontSize:'14px', fontWeight:800, color: evt.type==='critical'?'#f87171':'#c3c0ff' }}>{evt.date}</span>
                    <span className={`badge ${s.badgeCls}`}>{evt.label}</span>
                  </div>
                  <h3 style={{ fontSize:'16px', fontWeight:700, color:'#fff', marginBottom:'6px' }}>{evt.title}</h3>
                  <p style={{ fontSize:'14px', color:'#c7c4d8', lineHeight:1.65 }}>{evt.desc}</p>
                  {evt.href && (
                    <a href={evt.href} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'6px', marginTop:'14px', background:'linear-gradient(135deg,#ff671f,#046a38)', color:'#fff', fontFamily:'inherit', fontSize:'13px', fontWeight:700, padding:'9px 18px', borderRadius:'9999px', textDecoration:'none', boxShadow:'0 4px 14px rgba(255,103,31,0.35)' }}>
                      {evt.cta || 'Visit Portal →'}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
