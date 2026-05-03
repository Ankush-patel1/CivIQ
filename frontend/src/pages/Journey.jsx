import { useState } from 'react';
import { Check as CheckIcon, Lock as LockIcon, Info as InfoIcon, ChevronUp, ChevronDown } from 'lucide-react';

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

export default function Journey({ user, onUpdateUser }) {
  const [expanded, setExpanded] = useState(1);
  const isReg = user?.status === 'registered';

  const completedSteps = user?.completedSteps || (isReg ? [1] : []);

  const getStatus = (id) => {
    if (completedSteps.includes(id)) return 'completed';
    const maxCompleted = completedSteps.length > 0 ? Math.max(...completedSteps) : 0;
    if (id === maxCompleted + 1) return 'active';
    return 'locked';
  };

  const handleCompleteStep = (id) => {
    if (!onUpdateUser) return;
    const newCompleted = [...new Set([...completedSteps, id])];
    onUpdateUser({ ...user, completedSteps: newCompleted });
    setExpanded(id + 1 <= 5 ? id + 1 : null);
  };

  const completedCount = completedSteps.length;

  return (
    <div className="page-container animate-fade-in">
      <header className="journey-header">
        <h1 className="journey-title">Voter Journey</h1>
        <p className="journey-subtitle">
          Follow these 5 essential steps to participate in India's democratic process.
        </p>
      </header>

      {/* Progress Card */}
      <section className="card progress-container" aria-label="Completion Progress">
        <div className="progress-header">
          <span className="progress-label">Your Journey Progress</span>
          <span className="progress-value">{completedCount} of 5 Steps</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={completedCount} aria-valuemin="0" aria-valuemax="5">
          <div className="progress-fill" style={{ '--progress-width': `${(completedCount / 5) * 100}%` }} />
        </div>
        <p className="progress-status">
          {completedCount === 5 ? '🎉 Congratulations! You are a fully informed voter.' : 
           completedCount > 0 ? `Keep going! Your next step is Step ${completedCount + 1}.` : 
           'Start your journey with Step 1: Enrolment.'}
        </p>
      </section>

      <div className="steps-list">
        {STEPS.map((step) => {
          const status = getStatus(step.id);
          const isOpen = expanded === step.id;
          const isDone = status === 'completed';
          const isActive = status === 'active';
          const isLocked = status === 'locked';

          return (
            <div
              key={step.id}
              className={`card step-card ${isDone ? 'completed' : ''} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
            >
              <button
                onClick={() => !isLocked && setExpanded(isOpen ? null : step.id)}
                className="step-trigger"
                aria-expanded={isOpen}
                disabled={isLocked}
              >
                <div className="step-icon-container">
                  {isDone ? <CheckIcon size={24} color="#4ade80" /> : isLocked ? <LockIcon size={20} color="rgba(255,255,255,0.2)" /> : step.emoji}
                </div>
                <div className="step-info">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-short">{step.short}</p>
                </div>
                <div className="step-badges">
                  {isDone && <span className="badge badge-completed">Completed</span>}
                  {isActive && <span className="badge badge-active">Active</span>}
                  {isLocked && <span className="badge badge-locked">Locked</span>}
                  {!isLocked && (isOpen ? <ChevronUp size={20} opacity={0.5} /> : <ChevronDown size={20} opacity={0.5} />)}
                </div>
              </button>

              <div className={`accordion-content ${isOpen && !isLocked ? 'open' : ''}`}>
                <div className="step-details">
                  <div className="info-box">
                    <div className="info-label">
                      <InfoIcon size={14} />
                      <span>Deep Dive</span>
                    </div>
                    <p className="info-text">{step.what}</p>
                  </div>

                  <div className="why-box">
                    <p className="why-label">Importance</p>
                    <p className="info-text">{step.why}</p>
                  </div>

                  <h4 className="section-label">Implementation Guide</h4>
                  <div className="how-to-grid">
                    {step.howTo.map((h, j) => (
                      <div key={j} className="how-to-item">
                        <span className="how-to-icon">{h.icon}</span>
                        <div>
                          <p className="how-to-title">{h.label}</p>
                          <p className="how-to-desc">{h.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="section-label">Requirements</h4>
                  <div className="docs-list">
                    {step.need.map((n, j) => (
                      <div key={j} className="doc-item">
                        <CheckIcon size={14} className="doc-icon" />
                        <span className="doc-text">{n}</span>
                      </div>
                    ))}
                  </div>

                  <div className="tip-box">
                    <p className="tip-text">{step.tip}</p>
                  </div>

                  <footer className="step-footer">
                    <span className="badge badge-warning">Deadline: {step.deadline}</span>
                    {isActive && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleteStep(step.id);
                        }}
                        className="btn-primary step-complete-btn"
                      >
                        Mark Step Complete
                      </button>
                    )}
                  </footer>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
