import React from 'react';
import { ChevronRight } from './Icons';

export default function Dashboard({ user, navigateTo }) {
  const isRegistered = user?.status === 'registered';
  const isNotSure    = user?.status === 'not_sure';

  const nextStep = isRegistered
    ? { emoji:'📍', title:'Find Your Polling Booth', desc:"You have a Voter ID! Now locate your exact polling booth using the ECI booth locator so you're ready on election day.", action:'View My Journey', view:'journey' }
    : isNotSure
    ? { emoji:'🔍', title:'Verify Your Voter Enrolment', desc:"Not sure if you're enrolled? Use our AI assistant to get step-by-step guidance on how to check your status on the official portal.", action:'Ask AI Assistant', view:'chat' }
    : { emoji:'📝', title:'Register as a Voter — First!', desc:'Apply for your Voter ID (EPIC card) before the enrolment deadline. It only takes 10 minutes on the official ECI portal.', action:'See How to Register', view:'journey' };

  const quickCards = [
    { emoji:'🗺️', title:'Step-by-Step Voter Guide',  desc:'Every step of the Indian election process explained simply.',        view:'journey',  color:'#4f46e5' },
    { emoji:'📅', title:'Key Dates & Deadlines',      desc:'Never miss an ECI-announced enrolment or voting deadline.',         view:'timeline', color:'#0ea5e9' },
    { emoji:'🤖', title:'Ask the AI Assistant',       desc:'Get instant answers to your voting doubts in plain English.',       view:'chat',     color:'#818cf8' },
  ];

  return (
    <div className="page-container">
      <div style={{ marginBottom:'28px' }}>
        <p style={{ fontSize:'13px', fontWeight:700, color:'#918fa1', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'6px' }}>
          📍 {user?.location || 'India'}
        </p>
        <h1 style={{ fontSize:'clamp(26px, 4vw, 38px)', fontWeight:900, color:'#fff', lineHeight:1.15 }}>
          Hello, {user?.name?.split(' ')[0] || 'Citizen'}!
        </h1>
        <p style={{ color:'#c7c4d8', marginTop:'8px', fontSize:'16px' }}>
          Your personalised Indian election guide is ready.
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Hero next action */}
        <div style={{
          background:'linear-gradient(135deg, #7c1d0a 0%, #c94b11 40%, #046a38 100%)',
          borderRadius:'28px', padding:'32px', position:'relative', overflow:'hidden',
          boxShadow:'0 8px 40px rgba(201,75,17,0.35)',
        }}>
          <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.07)' }} />
          <p style={{ fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.6)', letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:'16px' }}>⚡ YOUR NEXT STEP</p>
          <div style={{ fontSize:'42px', marginBottom:'10px' }}>{nextStep.emoji}</div>
          <h2 style={{ fontSize:'clamp(20px, 3vw, 26px)', fontWeight:800, color:'#fff', marginBottom:'10px', lineHeight:1.2 }}>{nextStep.title}</h2>
          <p style={{ color:'rgba(255,255,255,0.80)', fontSize:'15px', lineHeight:1.7, marginBottom:'24px' }}>{nextStep.desc}</p>
          <button
            onClick={() => navigateTo(nextStep.view)}
            style={{
              background:'rgba(255,255,255,0.15)', backdropFilter:'blur(12px)',
              border:'1px solid rgba(255,255,255,0.28)', color:'#fff',
              padding:'12px 22px', borderRadius:'9999px', fontFamily:'inherit',
              fontSize:'14px', fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:'8px', transition:'background 0.2s',
            }}
          >
            {nextStep.action} <ChevronRight size={16} />
          </button>
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {/* Status banner */}
          <div className="card" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <p style={{ fontSize:'12px', fontWeight:700, color:'#918fa1', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'4px' }}>Next General Election</p>
              <p style={{ fontSize:'22px', fontWeight:800, color:'#fff' }}>Lok Sabha 2029</p>
              <p style={{ fontSize:'13px', color:'#c7c4d8', marginTop:'4px' }}>Check ECI for state elections</p>
            </div>
            <div style={{ textAlign:'center', background:'linear-gradient(135deg,#ff671f,#046a38)', borderRadius:'16px', padding:'14px 18px', boxShadow:'0 4px 20px rgba(255,103,31,0.35)', flexShrink:0 }}>
              <span style={{ fontSize:'28px' }}>🇮🇳</span>
              <p style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.75)', letterSpacing:'0.06em', marginTop:'4px' }}>INDIA VOTES</p>
            </div>
          </div>

          {/* Quick access */}
          {quickCards.map((c, i) => (
            <div
              key={i}
              className="card step-card"
              onClick={() => navigateTo(c.view)}
              style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:'16px', padding:'18px 20px' }}
            >
              <div style={{ fontSize:'26px', background:`${c.color}20`, borderRadius:'14px', padding:'10px 12px', flexShrink:0 }}>
                {c.emoji}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <h3 style={{ fontSize:'15px', fontWeight:700, color:'#fff', marginBottom:'3px' }}>{c.title}</h3>
                <p style={{ fontSize:'13px', color:'#c7c4d8', lineHeight:1.5 }}>{c.desc}</p>
              </div>
              <ChevronRight size={18} style={{ color:'#464555', flexShrink:0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
