
import { useState } from 'react';
import { User, MapPin, ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand',
  'West Bengal','Delhi (NCT)','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh',
];

const STATUS_OPTIONS = [
  { value:'not_registered', label:'Not Enrolled Yet', sub:'I need to apply for a Voter ID' },
  { value:'registered', label:'Already Enrolled', sub:'I have a Voter ID (EPIC card)' },
  { value:'not_sure', label:'Not Sure', sub:'I need to verify my status' },
];

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('not_registered');
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && name && location) { setStep(2); return; }
    if (step === 2) onComplete({ name, location, status });
  };

  return (
    <div className="login-page">
      <div className="card animate-scale-in onboarding-card" style={{ width:'100%', maxWidth:'480px', padding: '40px' }}>
        
        {/* Progress */}
        <div className="onboarding-progress">
          {[1,2].map(s => (
            <div key={s} className={`onboarding-progress-step ${step >= s ? 'active' : ''}`} />
          ))}
        </div>

        {step === 1 ? (
          <form onSubmit={handleNext}>
            <div className="onboarding-header">
              <div className="onboarding-header-icon icon-user-bg">
                <User size={32} color="#818cf8" />
              </div>
              <h1>Personalize CivIQ</h1>
              <p>Help us tailor your electoral roadmap.</p>
            </div>

            <div className="onboarding-form-fields">
              <div>
                <label className="input-label">Your Name</label>
                <div className="input-wrapper">
                   <User size={18} className="input-icon" />
                   <input className="input-glass" style={{ paddingLeft: '48px' }} placeholder="e.g. Rahul Sharma" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="input-label">Your State</label>
                <div className="input-wrapper">
                   <MapPin size={18} className="input-icon" />
                   <select className="input-glass" style={{ paddingLeft: '48px' }} value={location} onChange={e => setLocation(e.target.value)} required>
                     <option value="" disabled>Select State</option>
                     {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={!name || !location}>
              Next Step <ChevronRight size={20} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleNext}>
            <div className="onboarding-header">
              <div className="onboarding-header-icon icon-check-bg">
                <CheckCircle size={32} color="#4ade80" />
              </div>
              <h2>Voter Status</h2>
              <p>Are you already enrolled as a voter?</p>
            </div>

            <div className="onboarding-status-list">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`status-option ${status === opt.value ? 'active' : ''}`}
                >
                  <p>{opt.label}</p>
                  <p>{opt.sub}</p>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={() => setStep(1)} className="btn-glass" style={{ width: '60px' }}>
                <ArrowLeft size={20} />
              </button>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                Complete Setup
              </button>
            </div>
          </form>
        )}

        <div className="onboarding-footer">
           <div className="footer-status-dot" />
           <span className="footer-status-text">Secure Encrypted Profile</span>
        </div>
      </div>
    </div>
  );
}
