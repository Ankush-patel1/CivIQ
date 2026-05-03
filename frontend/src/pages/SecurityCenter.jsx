
import { ShieldCheck, Lock, Eye, Key, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SecurityCenter() {
  const securityFeatures = [
    {
      title: "Data Encryption",
      desc: "All your profile data and chat history are encrypted at rest and in transit using industry-standard AES-256 and SSL/TLS.",
      icon: Lock,
      status: "Active"
    },
    {
      title: "Privacy First",
      desc: "We do not sell your personal data. Your location is only used to provide relevant local election information and booth locations.",
      icon: Eye,
      status: "Strict"
    },
    {
      title: "Secure Authentication",
      desc: "Powered by Firebase Google Auth, ensuring multi-factor authentication and secure token management.",
      icon: Key,
      status: "Verified"
    },
    {
      title: "Information Integrity",
      desc: "Our AI (RumorMill) analyzes news claims against official ECI sources to protect you from misinformation.",
      icon: ShieldCheck,
      status: "Monitoring"
    }
  ];

  return (
    <div className="security-container animate-fade-up">
      <div className="security-header">
        <div className="security-header-icon">
          <ShieldCheck size={32} color="#22c55e" />
        </div>
        <h1>Security & Privacy</h1>
        <p>How we protect your civic data and ensure election integrity.</p>
      </div>

      <div className="security-grid">
        {securityFeatures.map((f, i) => (
          <div key={i} className="card-glass security-card group">
            <div className="security-card-decor" />
            <div className="security-card-top">
              <div className="security-card-icon">
                <f.icon size={24} />
              </div>
              <span className="badge badge-active security-card-status">
                {f.status}
              </span>
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="card best-practices-card">
        <div className="best-practices-content">
          <div className="best-practices-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="best-practices-text">
            <h4>Security Best Practices</h4>
            <ul className="best-practices-list">
              <li><CheckCircle size={14} color="#22c55e" /> Never share your Voter ID OTP with anyone.</li>
              <li><CheckCircle size={14} color="#22c55e" /> Always verify polling booth details on the official ECI portal.</li>
              <li><CheckCircle size={14} color="#22c55e" /> Report suspicious civic misinformation via our RumorMill tool.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="security-footer">
        <p>Last Security Audit: May 2026 • Version 2.4.1</p>
      </div>
    </div>
  );
}

