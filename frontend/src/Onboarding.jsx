import { useState } from 'react';
import { BookIcon, ChevronRight } from './Icons';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand',
  'West Bengal','Delhi (NCT)','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh',
];

const STATUS_OPTIONS = [
  { value:'not_registered', label:'No, I have not enrolled yet',        sub:'I need to apply for a Voter ID (EPIC card)' },
  { value:'registered',     label:'Yes, I have a Voter ID (EPIC card)', sub:'I am already on the Electoral Roll'          },
  { value:'not_sure',       label:'I am not sure',                      sub:'I need to check my enrolment status'        },
];

export default function Onboarding({ onComplete }) {
  const [name,     setName]     = useState('');
  const [location, setLocation] = useState('');
  const [status,   setStatus]   = useState('not_registered');
  const [step,     setStep]     = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && name && location) { setStep(2); return; }
    if (step === 2) onComplete({ name, location, status });
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', position:'relative', overflow:'hidden' }}>
      {/* Orbs */}
      <div style={{ position:'fixed', top:'-100px', left:'-100px', width:'500px', height:'500px', pointerEvents:'none', borderRadius:'50%', filter:'blur(120px)', background:'radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)' }} />
      <div style={{ position:'fixed', bottom:'-80px', right:'-80px', width:'400px', height:'400px', pointerEvents:'none', borderRadius:'50%', filter:'blur(120px)', background:'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)' }} />

      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'32px', position:'relative', zIndex:1 }}>
        <div style={{ background:'linear-gradient(135deg,#ff671f,#046a38)', padding:'12px', borderRadius:'18px' }}>
          <BookIcon size={26} style={{ color:'#fff' }} />
        </div>
        <div>
          <span style={{ fontSize:'26px', fontWeight:900, background:'linear-gradient(90deg,#c3c0ff,#89ceff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'-0.5px' }}>
            CivIQ
          </span>
          <p style={{ fontSize:'12px', color:'#918fa1', fontWeight:600, marginTop:'-2px' }}>India's Voter Guide</p>
        </div>
      </div>

      {/* Card */}
      <div className="card card-lg animate-scale-in" style={{ width:'100%', maxWidth:'460px', position:'relative', zIndex:1 }}>

        {/* Step indicator */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'24px' }}>
          {[1,2].map(s => (
            <div key={s} style={{ height:'4px', flex:1, borderRadius:'9999px', background: step >= s ? 'linear-gradient(90deg,#4f46e5,#0ea5e9)' : 'rgba(255,255,255,0.10)', transition:'background 0.3s' }} />
          ))}
        </div>

        {step === 1 ? (
          <>
            <div style={{ marginBottom:'28px' }}>
              <span className="badge badge-active" style={{ marginBottom:'12px', fontSize:'11px' }}>Step 1 of 2 — Your Details</span>
              <h1 style={{ fontSize:'clamp(22px,5vw,28px)', fontWeight:900, color:'#fff', marginBottom:'8px', lineHeight:1.2 }}>
                Welcome to CivIQ
              </h1>
              <p style={{ color:'#c7c4d8', fontSize:'15px', lineHeight:1.65 }}>
                India's first interactive voter guide. Let's personalise your election roadmap — takes 60 seconds.
              </p>
            </div>

            <form onSubmit={handleNext}>
              <div style={{ marginBottom:'18px' }}>
                <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#c7c4d8', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:'8px' }}>
                  Full Name
                </label>
                <input
                  className="input-glass"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div style={{ marginBottom:'28px' }}>
                <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#c7c4d8', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:'8px' }}>
                  Your State / Union Territory
                </label>
                <select
                  className="input-glass"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                >
                  <option value="" disabled>Select your state…</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <button type="submit" className="btn-primary" disabled={!name || !location}>
                Continue
                <ChevronRight size={18} />
              </button>
            </form>
          </>
        ) : (
          <>
            <div style={{ marginBottom:'28px' }}>
              <span className="badge badge-active" style={{ marginBottom:'12px', fontSize:'11px' }}>Step 2 of 2 — Your Voter Status</span>
              <h2 style={{ fontSize:'clamp(20px,5vw,26px)', fontWeight:900, color:'#fff', marginBottom:'8px', lineHeight:1.2 }}>
                Are you enrolled as a voter?
              </h2>
              <p style={{ color:'#c7c4d8', fontSize:'15px', lineHeight:1.65 }}>
                This helps us show you the right next step on your dashboard.
              </p>
            </div>

            <form onSubmit={handleNext}>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'28px' }}>
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    style={{
                      width:'100%', padding:'16px 18px', borderRadius:'16px', border:'1.5px solid', fontFamily:'inherit',
                      borderColor: status === opt.value ? 'rgba(195,192,255,0.55)' : 'rgba(255,255,255,0.09)',
                      background:  status === opt.value ? 'rgba(79,70,229,0.20)' : 'rgba(255,255,255,0.03)',
                      color:'#dae2fd', textAlign:'left', cursor:'pointer', transition:'all 0.2s',
                    }}
                  >
                    <p style={{ fontSize:'15px', fontWeight:700, marginBottom:'2px' }}>{opt.label}</p>
                    <p style={{ fontSize:'12px', color:'#918fa1', fontWeight:500 }}>{opt.sub}</p>
                  </button>
                ))}
              </div>

              <div style={{ display:'flex', gap:'10px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-glass"
                  style={{ flex:'0 0 auto', width:'52px', minHeight:'52px' }}
                >
                  ←
                </button>
                <button type="submit" className="btn-primary" style={{ flex:1 }}>
                  Start My Journey
                  <ChevronRight size={18} />
                </button>
              </div>
            </form>
          </>
        )}

        <p style={{ textAlign:'center', marginTop:'20px', fontSize:'12px', color:'#918fa1' }}>
          🔒 Your information stays on this device only — never uploaded
        </p>
      </div>
    </div>
  );
}
