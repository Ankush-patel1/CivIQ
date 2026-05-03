

import { Shield, ExternalLink, LogOut } from 'lucide-react';

export default function Profile({ user, onLogout }) {
  const statusLabel = {
    registered:     { badge:'badge-completed', text:'✅ Enrolled — Has Voter ID (EPIC)' },
    not_registered: { badge:'badge-danger',    text:'❌ Not Yet Enrolled' },
    not_sure:       { badge:'badge-warning',   text:'🤔 Not Sure / Needs Verification' },
  }[user?.status] || { badge:'badge-locked', text:'Unknown' };

  return (
    <div className="profile-container animate-fade-up">
      <div className="profile-header">
        <h1>Your Civic Identity</h1>
        <p>Verified secure profile on CivIQ.</p>
      </div>

      {/* Profile Card */}
      <div className="card profile-card">
        <div className="avatar-wrapper">
          <div className="avatar-inner">
            <img src={user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="Avatar" />
          </div>
          <div className="shield-icon">
            <Shield size={16} color="#fff" />
          </div>
        </div>
        <h2 className="user-name">{user?.name}</h2>
        <p className="user-location">📍 {user?.location}, India</p>
        <div className="badge-wrapper">
           <span className={`badge ${statusLabel.badge}`}>{statusLabel.text}</span>
        </div>
      </div>

      {/* Official Resources */}
      <div className="card resources-card">
        <h3>
          <ExternalLink size={16} /> Official Voter Resources
        </h3>
        <div className="resources-grid">
          {[
            { label:'Check Voter List', url: 'https://electoralsearch.eci.gov.in' },
            { label:'Apply for Voter ID', url: 'https://voters.eci.gov.in' },
            { label:'Download Voter Helpline App', url: 'https://play.google.com/store/apps/details?id=com.eci.citizen' },
          ].map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer"
              className="resource-link"
            >
              <span className="resource-label">{link.label}</span>
              <ExternalLink size={16} color="#464555" />
            </a>
          ))}
        </div>
      </div>

      <button onClick={onLogout} className="signout-btn">
        <LogOut size={20} /> Sign Out from CivIQ
      </button>
    </div>
  );
}

