import React from 'react';
import { CheckIcon } from './Icons';

export default function Profile({ user, onReset }) {
  const statusLabel = {
    registered:     { badge:'badge-completed', text:'✅ Enrolled — Has Voter ID (EPIC)' },
    not_registered: { badge:'badge-danger',    text:'❌ Not Yet Enrolled' },
    not_sure:       { badge:'badge-warning',   text:'🤔 Not Sure / Needs Verification' },
  }[user?.status] || { badge:'badge-locked', text:'Unknown' };

  return (
    <div className="page-container" style={{ maxWidth:'720px' }}>
      <div style={{ marginBottom:'24px' }}>
        <h1 style={{ fontSize:'clamp(24px,4vw,36px)', fontWeight:900, color:'#fff', marginBottom:'6px' }}>
          Your Profile
        </h1>
        <p style={{ color:'#c7c4d8', fontSize:'16px' }}>Your personalised voter information for India.</p>
      </div>

      {/* Profile Card */}
      <div className="card card-lg" style={{ marginBottom:'20px', textAlign:'center' }}>
        <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'linear-gradient(135deg,#ff671f,#046a38)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'32px' }}>
          👤
        </div>
        <h2 style={{ fontSize:'24px', fontWeight:900, color:'#fff', marginBottom:'4px' }}>{user?.name}</h2>
        <p style={{ color:'#c7c4d8', marginBottom:'12px' }}>📍 {user?.location}, India</p>
        <span className={`badge ${statusLabel.badge}`}>{statusLabel.text}</span>
      </div>

      {/* Info table */}
      <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px' }}>
        {[
          { label:'Voter Status',           value: statusLabel.text },
          { label:'State',                  value: user?.location },
          { label:'Next General Election',  value: 'Lok Sabha 2029' },
          { label:'Voter Helpline',         value: '📞 1950 (Free, Multi-language)' },
          { label:'Voter Portal',           value: 'voters.eci.gov.in' },
        ].map((item, i) => (
          <div key={i} className="card" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', flexWrap:'wrap', gap:'8px' }}>
            <span style={{ fontSize:'14px', color:'#918fa1', fontWeight:600 }}>{item.label}</span>
            <span style={{ fontSize:'14px', color:'#dae2fd', fontWeight:700, textAlign:'right' }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Official ECI Links */}
      <div className="card" style={{ marginBottom:'24px' }}>
        <p style={{ fontSize:'12px', fontWeight:700, color:'#918fa1', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>
          🇮🇳 Official ECI Resources
        </p>
        {[
          { emoji:'🌐', label:'voters.eci.gov.in',            href:'https://voters.eci.gov.in',              desc:'Voter enrolment, Form 6, Form 8, EPIC application' },
          { emoji:'🔍', label:'electoralsearch.eci.gov.in',   href:'https://electoralsearch.eci.gov.in',     desc:'Check your name on the Electoral Roll' },
          { emoji:'📊', label:'results.eci.gov.in',           href:'https://results.eci.gov.in',             desc:'Official election results in real-time' },
          { emoji:'🏛️', label:'eci.gov.in',                   href:'https://eci.gov.in',                     desc:'Election Commission of India homepage' },
          { emoji:'📱', label:'cVIGIL App',                   href:'https://play.google.com/store/apps/details?id=in.nic.ecicvigil.cvigil', desc:'Report election violations anonymously' },
          { emoji:'📞', label:'Helpline 1950',                href:'tel:1950',                               desc:'Free national voter helpline — English & regional languages' },
        ].map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.href.startsWith('tel') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px', borderRadius:'12px', textDecoration:'none', marginBottom:'8px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', transition:'background 0.2s' }}
          >
            <span style={{ fontSize:'20px', flexShrink:0 }}>{link.emoji}</span>
            <div style={{ minWidth:0 }}>
              <p style={{ fontSize:'14px', fontWeight:700, color:'#89ceff' }}>{link.label}</p>
              <p style={{ fontSize:'12px', color:'#918fa1', lineHeight:1.4 }}>{link.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Important IDs accepted at booth */}
      <div className="card" style={{ marginBottom:'24px' }}>
        <p style={{ fontSize:'12px', fontWeight:700, color:'#918fa1', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>
          🪪 IDs Accepted at Polling Booth
        </p>
        {[
          'Voter ID Card (EPIC)',
          'Aadhaar Card',
          'PAN Card',
          'Indian Passport',
          'Driving Licence',
          'MNREGA Job Card',
          'Bank / Post Office Passbook with photo',
          'Service Photo ID (Govt / PSU employees)',
          'Disability Certificate (Unique) with photo',
        ].map((id, i) => (
          <div key={i} style={{ display:'flex', gap:'10px', alignItems:'center', marginBottom:'8px' }}>
            <CheckIcon size={14} style={{ color:'#4ade80', flexShrink:0 }} />
            <span style={{ fontSize:'14px', color:'#dae2fd' }}>{id}</span>
          </div>
        ))}
        <p style={{ fontSize:'12px', color:'#918fa1', marginTop:'10px' }}>
          * Original documents only — photocopies not accepted.
        </p>
      </div>

      <button
        onClick={onReset}
        style={{ width:'100%', padding:'14px', borderRadius:'9999px', fontFamily:'inherit', fontSize:'14px', fontWeight:700, color:'#f87171', cursor:'pointer', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(248,113,113,0.20)', transition:'background 0.2s' }}
      >
        Start Over / Change Profile
      </button>
    </div>
  );
}
