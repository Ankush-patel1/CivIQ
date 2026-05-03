
import { useState, useEffect } from 'react';

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
];

export default function Timeline({ currentTime }) {
  const [countdown, setCountdown] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  
  useEffect(() => {
    const tick = () => {
      const diff = ELECTION_DATE - currentTime;
      if (diff <= 0) { setCountdown({ days:0, hours:0, minutes:0, seconds:0 }); return; }
      setCountdown({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
  }, [currentTime]);

  const getEventStyles = (t) => {
    const styles = {
      danger:   { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' },
      warning:  { color: '#eab308', bg: 'rgba(234, 179, 8, 0.07)' },
      critical: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', glow: true },
      action:   { color: '#4f46e5', bg: 'rgba(79, 70, 229, 0.12)' },
      info:     { color: '#464555', bg: 'rgba(14, 165, 233, 0.06)' },
      normal:   { color: '#4ade80', bg: 'rgba(34, 197, 94, 0.06)' },
    }[t] || {};
    
    return {
      '--event-color': styles.color,
      '--event-bg': styles.bg,
      glow: styles.glow
    };
  };

  return (
    <div className="page-container timeline-container">
      <div className="timeline-header">
        <h1>Election <span>Calendar</span></h1>
        <p>Track national and state-level elections. Stay ahead of every critical deadline.</p>
      </div>

      {/* Countdown Card */}
      <div className="animate-fade-in">
        <div className="tl-countdown-card">
          <div className="tl-countdown-decor" />
          <h2 className="countdown-title">Countdown to Lok Sabha 2029</h2>
          <div className="tl-countdown-grid">
            {Object.entries(countdown).map(([unit, val]) => (
              <div key={unit} className="tl-countdown-item">
                <span className="tl-countdown-value">{String(val).padStart(2,'0')}</span>
                <span className="tl-countdown-unit">{unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-wrapper">
          <div className="timeline-line" />
          <div className="timeline-list">
            {EVENTS.map((evt, i) => {
              const { glow, ...cssVars } = getEventStyles(evt.type);
              return (
                <div key={i} className="card-glass timeline-event-card animate-scale-in" style={cssVars}>
                  <div className={`timeline-dot ${glow ? 'glow' : ''}`} />
                  <div className="event-header">
                      <span className="event-date">{evt.date}</span>
                      <span className="event-badge">{evt.label}</span>
                  </div>
                  <h3>{evt.title}</h3>
                  <p>{evt.desc}</p>
                  {evt.href && (
                    <a href={evt.href} target="_blank" rel="noopener noreferrer" className="btn-primary event-cta">
                      {evt.cta}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

