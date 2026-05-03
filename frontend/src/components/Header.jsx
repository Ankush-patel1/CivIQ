import { Clock, CheckCircle, Menu, X } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const Header = ({ setView, view, profile, user, formattedDate, isMobileMenuOpen, setIsMobileMenuOpen, navItems }) => {
  return (
    <header className="main-header" role="banner">
      <div className="logo-container" onClick={() => setView('dashboard')} role="button" aria-label="CivIQ Home">
        <div className="logo-icon">
          <CheckCircle size={22} />
        </div>
        <span className="logo-text">CivIQ</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav" role="navigation" aria-label="Main Menu">
        {navItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`nav-item-btn ${view === id ? 'active' : ''}`}
            aria-current={view === id ? 'page' : undefined}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <div className="header-info-group hide-mobile">
          <div className="live-clock">
            <Clock size={14} />
            <span>{formattedDate}</span>
          </div>
          <div className="location-pill" aria-label={`Current location: ${profile?.location || 'India'}`}>
            📍 {profile?.location || 'India'}
          </div>
        </div>

        <NotificationCenter />

        <button 
          className="profile-avatar-btn" 
          onClick={() => setView('profile')}
          aria-label="View Profile"
        >
          <img 
            src={user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
            alt="User Avatar" 
          />
        </button>

        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
