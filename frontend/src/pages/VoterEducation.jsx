import { useState } from 'react';
import { CheckCircle, FileText, ShieldCheck, Smartphone, BookOpen, ArrowUpRight, HelpCircle, Scroll } from 'lucide-react';


const topics = {
  registration: [
    {
      title: 'Form 6',
      subtitle: 'New Voter Registration',
      desc: 'For first-time voters or those shifting from another constituency. Apply online at voters.eci.gov.in.',
      link: 'https://voters.eci.gov.in/',
      icon: FileText,
      color: '#818cf8',
      bg: 'rgba(79,70,229,0.12)',
    },
    {
      title: 'Form 8',
      subtitle: 'Correction / EPIC Replacement',
      desc: 'Correct particulars in the existing electoral roll or apply for a replacement EPIC card.',
      link: 'https://voters.eci.gov.in/',
      icon: Scroll,
      color: '#34d399',
      bg: 'rgba(16,185,129,0.12)',
    },
    {
      title: 'EPIC Card',
      subtitle: 'Voter Identity Card',
      desc: 'Your Electors Photo Identity Card issued by ECI. Mandatory for exercising your right to vote.',
      link: 'https://voters.eci.gov.in/',
      icon: ShieldCheck,
      color: '#60a5fa',
      bg: 'rgba(59,130,246,0.12)',
    },
  ],
  voting: [
    {
      title: 'EVM Basics',
      subtitle: 'Electronic Voting Machine',
      desc: 'Cast your vote by pressing the button next to your candidate\'s name and symbol on the EVM.',
      icon: CheckCircle,
      color: '#4ade80',
      bg: 'rgba(34,197,94,0.12)',
    },
    {
      title: 'VVPAT Verification',
      subtitle: 'Paper Audit Trail',
      desc: 'After voting, a paper slip is shown for 7 seconds in the VVPAT unit confirming your vote.',
      icon: CheckCircle,
      color: '#4ade80',
      bg: 'rgba(34,197,94,0.12)',
    },
    {
      title: 'Indelible Ink',
      subtitle: 'Proof of Voting',
      desc: 'Applied on your left forefinger when you vote. It\'s permanent ink that lasts several weeks.',
      icon: CheckCircle,
      color: '#4ade80',
      bg: 'rgba(34,197,94,0.12)',
    },
  ],
  rights: [
    {
      title: 'Right to Vote',
      subtitle: 'Constitutional Right',
      desc: 'Every citizen above 18 has a fundamental right to vote, regardless of caste, religion, or gender.',
      icon: ShieldCheck,
      color: '#f472b6',
      bg: 'rgba(236,72,153,0.12)',
    },
    {
      title: 'Right to Know',
      subtitle: 'Candidate Transparency',
      desc: 'You have the right to know the criminal record, assets, and liabilities of every candidate.',
      icon: BookOpen,
      color: '#fb923c',
      bg: 'rgba(249,115,22,0.12)',
    },
    {
      title: 'NOTA',
      subtitle: 'None of the Above',
      desc: 'You can reject all candidates by pressing NOTA on the EVM. Your dissent still counts.',
      icon: CheckCircle,
      color: '#a78bfa',
      bg: 'rgba(139,92,246,0.12)',
    },
    {
      title: 'Tendered Vote',
      subtitle: 'If Someone Voted in Your Name',
      desc: 'If someone has already voted using your identity, you may cast a "Tendered Vote" after verification.',
      icon: ShieldCheck,
      color: '#fbbf24',
      bg: 'rgba(245,158,11,0.12)',
    },
    {
      title: 'PwD Assistance',
      subtitle: 'Persons with Disability',
      desc: 'Voters with disabilities get priority access and can request assistance at polling stations.',
      icon: HelpCircle,
      color: '#34d399',
      bg: 'rgba(16,185,129,0.12)',
    },
  ],
  apps: [
    {
      title: 'cVIGIL',
      subtitle: 'Report MCC Violations',
      desc: 'Report any violation of the Model Code of Conduct directly to the ECI in real-time.',
      link: 'https://play.google.com/store/apps/details?id=in.nic.eci.cvigil',
      icon: Smartphone,
      color: '#f87171',
      bg: 'rgba(239,68,68,0.12)',
    },
    {
      title: 'Voter Helpline',
      subtitle: 'Check Voter List & EPIC',
      desc: 'Check your name in the electoral roll, download digital EPIC, and find polling booth details.',
      link: 'https://play.google.com/store/apps/details?id=com.eci.citizen',
      icon: Smartphone,
      color: '#60a5fa',
      bg: 'rgba(59,130,246,0.12)',
    },
    {
      title: 'Know Your Candidate',
      subtitle: 'Candidate Background',
      desc: 'View verified criminal antecedents, assets, and liabilities of candidates in your constituency.',
      link: 'https://play.google.com/store/apps/details?id=com.eci.kyc',
      icon: Smartphone,
      color: '#a78bfa',
      bg: 'rgba(139,92,246,0.12)',
    },
  ],
};

const TABS = [
  { id: 'registration', label: 'Registration', icon: FileText },
  { id: 'voting', label: 'Voting Process', icon: CheckCircle },
  { id: 'rights', label: 'Your Rights', icon: ShieldCheck },
  { id: 'apps', label: 'Official Apps', icon: Smartphone },
];

export default function VoterEducation() {
  const [activeTab, setActiveTab] = useState('registration');

  return (
    <div className="edu-container animate-fade-in">
      {/* Header */}
      <header className="edu-header">
        <div className="edu-title-row">
          <div className="edu-icon-bg">
            <BookOpen size={28} color="var(--color-primary)" />
          </div>
          <h1 className="edu-title">Voter Guide</h1>
        </div>
        <p className="edu-subtitle">Everything you need to know to be a responsible, informed voter.</p>
      </header>

      {/* Tab Bar */}
      <nav className="tabs-scroll-container">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`tab-btn ${activeTab === id ? 'active' : ''}`}
            aria-selected={activeTab === id}
            role="tab"
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Cards Grid */}
      <div className="edu-grid" role="tabpanel">
        {topics[activeTab].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`card edu-card ${item.link ? 'clickable' : ''}`}
              onClick={() => item.link && window.open(item.link, '_blank')}
              style={{ '--topic-color': item.color, '--topic-bg': item.bg }}
            >
              <div className="card-top">
                <div className="card-icon-box">
                  <Icon size={24} color="var(--topic-color)" />
                </div>
                {item.link && <ArrowUpRight size={18} className="external-icon" />}
              </div>

              <h3 className="card-title">{item.title}</h3>
              <div className="card-subtitle">
                {item.subtitle}
              </div>
              <p className="card-desc">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* CTA Banner */}
      <section className="edu-cta">
        <HelpCircle size={180} className="cta-bg-icon" />
        <div className="cta-content">
          <h3 className="cta-title">Have a Specific Question?</h3>
          <p className="cta-desc">
            Our AI assistant can answer questions about voter registration, symbols, and election rules for your local area.
          </p>
        </div>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'chat' }))}
          className="btn-primary cta-btn"
        >
          Ask AI Assistant →
        </button>
      </section>
    </div>
  );
}
