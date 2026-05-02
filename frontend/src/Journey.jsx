import React, { useState } from 'react';
import { CheckIcon, LockIcon, ChevronDown, ChevronUp, InfoIcon } from './Icons';

const STEPS = [
  {
    id: 1,
    emoji: '📝',
    title: 'Step 1: Voter Enrolment',
    short: 'Get your name added to the Electoral Roll.',
    what: 'Before you can vote in India, your name must appear on the Electoral Roll maintained by the Election Commission of India (ECI). This is done by applying for an EPIC card (Electors Photo Identity Card), commonly called the Voter ID card. Without enrolment, you cannot cast a ballot in any election — Lok Sabha, Vidhan Sabha, or local body.',
    why: 'India\'s elections are the world\'s largest democratic exercise. The Electoral Roll is the master list — only enrolled citizens aged 18 and above can vote. Your EPIC card is your proof of enrolment.',
    howTo: [
      { icon:'🌐', label:'Voter Portal (Online — Fastest)', desc:'Visit voters.eci.gov.in → Click "New Registration" → Fill Form 6 → Upload Aadhaar/photo → Submit.' },
      { icon:'📱', label:'Voter Helpline App', desc:'Download the official "Voter Helpline" app (Android/iOS) → Fill Form 6 digitally — track status in real time.' },
      { icon:'🏛️', label:'In Person at BLO/ERO', desc:'Visit your Booth Level Officer (BLO) or Electoral Registration Officer (ERO) office with physical Form 6 and documents.' },
    ],
    need: [
      'Proof of Age: Aadhaar card, Birth Certificate, Class X marksheet, or Passport',
      'Proof of Address: Aadhaar, Passport, utility bill (BSNL, electricity, water) in your name',
      'Passport-size photograph',
      'Mobile number linked to Aadhaar (for OTP verification online)',
    ],
    tip: '💡 Enrolment is open year-round. Special Summary Revision Periods are announced by ECI — check eci.gov.in for your state\'s schedule.',
    deadline: 'Enrolment cutoff: ~2 months before election',
  },
  {
    id: 2,
    emoji: '🔍',
    title: 'Step 2: Verify Your Name on the Electoral Roll',
    short: 'Confirm your name is on the voter list before election day.',
    what: 'Even after enrolling, it\'s crucial to verify that your name appears correctly on the final Electoral Roll. The ECI publishes draft rolls for public inspection, then a final roll before each election. Errors in name, age, or address can prevent you from voting.',
    why: 'Cases of name deletion, duplicate entries, or wrong details are common. Verifying 1–2 months before polling day gives you time to raise a correction through Form 8.',
    howTo: [
      { icon:'🌐', label:'Voter Portal Search', desc:'Go to voters.eci.gov.in or electoralsearch.eci.gov.in → Enter your name, state, and date of birth → Download your Voter ID details.' },
      { icon:'📱', label:'Voter Helpline App / 1950', desc:'Open the Voter Helpline App or call the National Voter Helpline 1950 → Enter details → Get instant status.' },
      { icon:'🏛️', label:'BLO Home Visit', desc:'Your Booth Level Officer (BLO) is assigned to every booth area. They visit houses to verify enrolment and help with corrections — free service.' },
    ],
    need: [
      'Your full name as on enrolment form',
      'Date of birth',
      'State and Assembly Constituency name',
      'EPIC number (if you already have a Voter ID card)',
    ],
    tip: '💡 The Electoral Roll is updated 3–4 times a year. If you find an error, file Form 8 (correction) or Form 7 (deletion of duplicate) on voters.eci.gov.in immediately.',
    deadline: 'At least 6 weeks before polling day',
  },
  {
    id: 3,
    emoji: '📍',
    title: 'Step 3: Find Your Polling Booth',
    short: 'Know your exact polling station in advance.',
    what: 'Every voter is assigned to a specific Polling Station (booth) based on their registered address. There are over 10 lakh polling stations across India. You cannot vote at a different booth — even if it\'s more convenient. Your Voter ID card and the Electoral Roll entry both show your designated booth number and name.',
    why: 'Voting at the wrong booth results in your vote being rejected. Booth assignment also determines which candidates appear on your EVM (Electronic Voting Machine).',
    howTo: [
      { icon:'🌐', label:'ECI Booth Locator', desc:'Visit electoralsearch.eci.gov.in → Enter your details → See your Polling Station name, number, and address.' },
      { icon:'📱', label:'Voter Helpline App', desc:'Open the app → My Voter ID → Your polling booth address is shown with a map link.' },
      { icon:'📄', label:'Check Your EPIC Card', desc:'Your Voter ID (EPIC) card contains your Booth Number and Part Number — these identify your exact polling station.' },
    ],
    need: [
      'Your registered address (must match enrolment records)',
      'EPIC card / Voter ID number',
      'Name and state',
    ],
    tip: '💡 The ECI\'s Suvidha app also lets you view the queue status at your booth on polling day — use it to plan when to go and avoid long waits!',
    deadline: 'Know your booth at least 1 week before polling',
  },
  {
    id: 4,
    emoji: '🗳️',
    title: 'Step 4: Polling Day',
    short: 'Go to your booth, cast your vote on the EVM.',
    what: 'On Polling Day, you visit your designated polling station, verify your identity, and cast your vote using an Electronic Voting Machine (EVM). A VVPAT (Voter Verifiable Paper Audit Trail) machine prints a slip confirming your choice for 7 seconds. The entire process takes about 5–10 minutes.',
    why: 'Your single vote shapes who governs India and your state. Voter turnout determines the strength of democracy — every vote matters.',
    howTo: [
      { icon:'⏰', label:'Check Booth Timing', desc:'Polling typically runs 7 AM – 6 PM. Timings vary by state and phase — check the ECI notification for your constituency.' },
      { icon:'🪪', label:'Bring Valid ID', desc:'Your EPIC card is the primary ID. Alternatives accepted: Aadhaar, Passport, MNREGA Job Card, PAN card, Driving Licence, service photo ID.' },
      { icon:'🧑‍⚖️', label:'Check In with Presiding Officer', desc:'A polling official verifies your name on the roll, applies indelible ink to your left index finger, and issues a ballot slip.' },
      { icon:'🖲️', label:'Press the EVM Button', desc:'Go behind the screen → Press the blue button next to your candidate\'s name and symbol on the EVM.' },
      { icon:'✅', label:'Confirm via VVPAT', desc:'The VVPAT window shows a printed slip with your candidate\'s name for 7 seconds — confirming your vote. You\'re done!' },
    ],
    need: [
      'Any one approved photo ID (EPIC, Aadhaar, Passport, etc.)',
      'Your polling booth address (from Step 3)',
      'Advance knowledge of your candidate — no phones inside the booth!',
    ],
    tip: '💡 If you are in the queue when polling closes, you MUST be allowed to vote. Do not leave the queue! This is a legal right under the Representation of the People Act.',
    deadline: 'Polling Day — announced by ECI per phase',
  },
  {
    id: 5,
    emoji: '📊',
    title: 'Step 5: Vote Counting & Results',
    short: 'What happens after you vote — counting, results, oath-taking.',
    what: 'Counting of votes happens on a separate day (usually 1–3 days after the last polling phase). EVM memory units are transported to counting centres under strict security. Counting is done round by round for each Assembly Segment. Results are declared by the Returning Officer.',
    why: 'Understanding the counting process helps you trust results and not fall for misinformation. India\'s EVMs are among the most audited voting systems in the world.',
    howTo: [
      { icon:'📺', label:'Watch Live on Doordarshan / News18 / NDTV', desc:'All major Indian news channels broadcast live counting with constituency-wise tallies.' },
      { icon:'🌐', label:'ECI Results Portal', desc:'Visit results.eci.gov.in for real-time, official constituency-wise results as counting progresses.' },
      { icon:'📅', label:'Formation of Government', desc:'After results, the President (Lok Sabha) or Governor (Vidhan Sabha) invites the majority party/alliance to form government. PM/CM takes oath weeks after counting.' },
    ],
    need: ['Nothing — you already voted! Just watch the results.'],
    tip: '💡 Results on the ECI portal are official. Do not rely on social media exit polls — they are often inaccurate.',
    deadline: 'Counting day: ~1–3 days after final polling phase',
  },
];

export default function Journey({ user }) {
  const [expanded, setExpanded] = useState(1);
  const isReg = user?.status === 'registered';

  const getStatus = (id) => {
    if (isReg) { if (id === 1) return 'completed'; if (id === 2) return 'active'; return 'locked'; }
    if (id === 1) return 'active'; return 'locked';
  };

  const completedCount = isReg ? 1 : 0;

  return (
    <div className="page-container">
      <div style={{ marginBottom:'24px' }}>
        <h1 style={{ fontSize:'clamp(24px, 4vw, 36px)', fontWeight:900, color:'#fff', marginBottom:'6px' }}>
          Voter Journey
        </h1>
        <p style={{ color:'#c7c4d8', fontSize:'16px', lineHeight:1.6 }}>
          Tap each step to learn exactly what to do in India's election process.
        </p>
      </div>

      {/* Progress */}
      <div className="card" style={{ marginBottom:'24px', padding:'20px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
          <span style={{ fontSize:'14px', fontWeight:700, color:'#c7c4d8' }}>Your Progress</span>
          <span style={{ fontSize:'14px', fontWeight:700, color:'#c3c0ff' }}>{completedCount} of 5 steps</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width:`${(completedCount/5)*100}%` }} /></div>
        <p style={{ fontSize:'13px', color:'#918fa1', marginTop:'8px' }}>
          {isReg ? '🎉 You have a Voter ID! Continue to Step 2 — verify your name.' : '👆 Start with Step 1 — get your Voter ID (EPIC card).'}
        </p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
        {STEPS.map((step) => {
          const status   = getStatus(step.id);
          const isOpen   = expanded === step.id;
          const isDone   = status === 'completed';
          const isActive = status === 'active';
          const isLocked = status === 'locked';

          return (
            <div
              key={step.id}
              className={`card step-card ${isActive ? 'active' : ''}`}
              style={{ padding:0, overflow:'hidden', borderColor: isDone?'rgba(74,222,128,0.25)':isActive?'rgba(195,192,255,0.35)':undefined, opacity:isLocked?0.6:1 }}
            >
              <button
                onClick={() => !isLocked && setExpanded(isOpen ? null : step.id)}
                style={{ width:'100%', padding:'20px 24px', display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:isLocked?'default':'pointer', textAlign:'left', fontFamily:'inherit' }}
              >
                <div style={{ width:'52px', height:'52px', borderRadius:'16px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', background:isDone?'rgba(74,222,128,0.15)':isActive?'rgba(79,70,229,0.25)':'rgba(255,255,255,0.05)' }}>
                  {isDone ? <CheckIcon size={22} style={{ color:'#4ade80' }} /> : isLocked ? <LockIcon size={18} style={{ color:'#464555' }} /> : step.emoji}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <h3 style={{ fontSize:'16px', fontWeight:800, color:isDone?'#4ade80':isLocked?'#918fa1':'#fff', marginBottom:'4px' }}>{step.title}</h3>
                  <p style={{ fontSize:'13px', color:'#918fa1', lineHeight:1.5, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{step.short}</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
                  {isDone   && <span className="badge badge-completed">Done</span>}
                  {isActive && <span className="badge badge-active">Now</span>}
                  {isLocked && <span className="badge badge-locked">Locked</span>}
                  {!isLocked && (isOpen ? <ChevronUp size={18} style={{ color:'#464555' }} /> : <ChevronDown size={18} style={{ color:'#464555' }} />)}
                </div>
              </button>

              <div className={`accordion-content ${isOpen && !isLocked ? 'open' : 'closed'}`}>
                <div style={{ padding:'4px 24px 28px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ padding:'16px', borderRadius:'16px', background:'rgba(79,70,229,0.10)', marginTop:'16px', marginBottom:'14px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                      <InfoIcon size={15} style={{ color:'#c3c0ff', flexShrink:0 }} />
                      <span style={{ fontSize:'11px', fontWeight:700, color:'#c3c0ff', letterSpacing:'0.07em', textTransform:'uppercase' }}>What is this?</span>
                    </div>
                    <p style={{ fontSize:'14px', color:'#dae2fd', lineHeight:1.75 }}>{step.what}</p>
                  </div>

                  <div style={{ padding:'14px', borderRadius:'14px', background:'rgba(14,165,233,0.08)', marginBottom:'14px' }}>
                    <p style={{ fontSize:'11px', fontWeight:700, color:'#89ceff', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:'6px' }}>💬 Why does it matter?</p>
                    <p style={{ fontSize:'14px', color:'#dae2fd', lineHeight:1.75 }}>{step.why}</p>
                  </div>

                  <p style={{ fontSize:'11px', fontWeight:700, color:'#918fa1', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:'10px' }}>How to do it:</p>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'10px', marginBottom:'16px' }}>
                    {step.howTo.map((h, j) => (
                      <div key={j} style={{ display:'flex', gap:'12px', padding:'14px', borderRadius:'14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                        <span style={{ fontSize:'22px', flexShrink:0 }}>{h.icon}</span>
                        <div>
                          <p style={{ fontSize:'13px', fontWeight:700, color:'#fff', marginBottom:'3px' }}>{h.label}</p>
                          <p style={{ fontSize:'12px', color:'#c7c4d8', lineHeight:1.55 }}>{h.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p style={{ fontSize:'11px', fontWeight:700, color:'#918fa1', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:'10px' }}>Documents needed:</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'16px' }}>
                    {step.need.map((n, j) => (
                      <div key={j} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                        <CheckIcon size={14} style={{ color:'#4ade80', flexShrink:0, marginTop:'3px' }} />
                        <span style={{ fontSize:'14px', color:'#dae2fd', lineHeight:1.6 }}>{n}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding:'14px', borderRadius:'14px', background:'rgba(250,204,21,0.08)', border:'1px solid rgba(250,204,21,0.15)', marginBottom:'14px' }}>
                    <p style={{ fontSize:'14px', color:'#fde68a', lineHeight:1.7 }}>{step.tip}</p>
                  </div>
                  <span className="badge badge-warning">📅 {step.deadline}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
