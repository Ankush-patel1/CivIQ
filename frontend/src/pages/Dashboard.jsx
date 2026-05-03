import { BookOpen, ShieldCheck, Map, Calendar, MessageSquare, ChevronRight, Bell, Info, Clock } from 'lucide-react';
import { STATE_ELECTIONS, ENHANCED_STATE_ELECTIONS, GENERAL_ELECTION } from '../data/electionData';
export default function Dashboard({ user, navigateTo, currentTime }) {
  const isRegistered = user?.status === 'registered';
  
  // Find local state election info
  const localStateInfo = ENHANCED_STATE_ELECTIONS.find(s => s.state === user?.location) || { 
    state: "India", 
    year: 2029, 
    month: "May", 
    dynamicStatus: "Upcoming" 
  };

  const quickCards = [
    { id: 'edu',      icon: <BookOpen size={24} />, title: 'Voter Guide', desc: 'Learn registration & rules.', color: '#22c55e' },
    { id: 'rumor',    icon: <ShieldCheck size={24} />, title: 'Fact-Check Rumors', desc: 'Verify viral claims instantly.', color: '#4f46e5' },
    { id: 'booth',    icon: <Map size={24} />, title: 'Booth Locator', desc: 'Find your polling station.', color: '#f59e0b' },
    { id: 'elections', icon: <Calendar size={24} />, title: 'State Elections', desc: 'View upcoming assemblies.', color: '#ec4899' },
    { id: 'chat',     icon: <MessageSquare size={24} />, title: 'Ask CivIQ AI', desc: 'Expert voting guidance.', color: '#818cf8' },
  ];

  const handleSetReminder = () => {
    if (Notification.permission === 'granted') {
      alert(`Reminder set for ${localStateInfo.state} Elections!`);
    } else {
      alert("Please enable notifications in the Safety center to set reminders.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="page-header">
        <p className="welcome-text">
          Welcome back, {user?.name?.split(' ')[0] || 'Citizen'}
        </p>
        <h1 className="page-title">
          Your Civic Dashboard
        </h1>
      </header>

      <div className="dashboard-grid">
        {/* Main Event Card */}
        <section className="card hero-card" aria-labelledby="hero-title">
          <div className="card-header-icon">
            <Calendar size={24} />
            <span className="card-label">Next Major Event</span>
          </div>

          <h2 id="hero-title" className="hero-heading">
            {localStateInfo.state} {localStateInfo.year}
          </h2>
          <p className="hero-desc">
            Status: <span className={`status-text-${localStateInfo.dynamicStatus.toLowerCase().replace(' ', '-')}`}>{localStateInfo.dynamicStatus}</span>. {isRegistered ? "You're all set to vote!" : "Action required: Register soon."}
          </p>
          <div className="hero-actions">
            <button 
              onClick={() => navigateTo('journey')}
              className="btn-primary" 
              aria-label="Check Registration Status"
            >
              Registration Status <ChevronRight size={18} />
            </button>
            <button 
              onClick={handleSetReminder}
              className="btn-glass hero-reminder-btn" 
              aria-label="Set Reminder"
            >
              <Bell size={18} /> Set Reminder
            </button>
          </div>
        </section>

        {/* Secondary Content Column */}
        <div className="dashboard-secondary-col">
          {/* General Election Mini-Card */}
          <div className="card countdown-card">
            <div className="countdown-info">
              <p className="countdown-label">General Election</p>
              <h3 className="countdown-title">{GENERAL_ELECTION.title}</h3>
            </div>
            <div className="countdown-badge">
              <span className="countdown-value">{GENERAL_ELECTION.countdown_years}y</span>
              <span className="countdown-unit">AWAY</span>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="quick-actions-grid">
            {quickCards.map((card) => (
              <button 
                key={card.id}
                onClick={() => navigateTo(card.id)}
                className="card action-card" 
                aria-label={`Go to ${card.title}`}
                style={{ 
                  '--card-color': card.color, 
                  '--card-color-bg': `${card.color}15` 
                }}
              >
                <div className="action-icon">
                  {card.icon}
                </div>
                <div className="action-content">
                  <h4 className="action-title">{card.title}</h4>
                  <p className="action-desc">{card.desc}</p>
                </div>
                <ChevronRight size={18} className="action-chevron" />
              </button>
            ))}
          </div>

          {/* Location Spotlight */}
          <section className="card spotlight-card" aria-labelledby="spotlight-title">
            <h4 id="spotlight-title" className="spotlight-header">
              <Info size={16} /> {user?.location || 'India'} Spotlight
            </h4>
            <div className="spotlight-grid">
              <div className="spotlight-item">
                <p className="spotlight-item-title">
                  {localStateInfo.dynamicStatus === 'Upcoming' || localStateInfo.dynamicStatus === 'Upcoming Soon' ? 'Electoral Roll Updates' : 'Campaigning Status'}
                </p>
                <p className="spotlight-item-text">
                  {localStateInfo.update || `The ECI has begun preliminary preparations for the next legislative assembly review in ${localStateInfo.state}.`}
                </p>
              </div>
              <div className="spotlight-item">
                <p className="spotlight-item-title">Key Voting Statistics</p>
                <p className="spotlight-item-text">
                  {localStateInfo.seats ? `${localStateInfo.seats} constituencies across ${localStateInfo.phases || 1} phases. ` : ''}
                  Voter turnout in the last election was significantly higher than the national average.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
