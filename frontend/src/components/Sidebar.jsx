import { CheckCircle, X, User, LogOut, Clock } from 'lucide-react';

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, setView, view, user, profile, handleLogout, navItems, formattedDate }) => {
  if (!isMobileMenuOpen) return null;

  return (
    <div className="mobile-sidebar-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
      <aside 
        className="mobile-sidebar glass-strong animate-slide-right" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Sidebar"
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <CheckCircle size={22} color="#c3c0ff" />
            <span className="logo-text">CivIQ</span>
          </div>
          <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-user-info">
          <div className="user-avatar-large">
            <img src={user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="Profile" />
          </div>
          <div className="user-details">
            <span className="user-name">{profile?.name || 'Citizen'}</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setView(id); setIsMobileMenuOpen(false); }}
              className={`sidebar-nav-item ${view === id ? 'active' : ''}`}
            >
              <Icon size={22} />
              <span>{label}</span>
            </button>
          ))}
          <div className="sidebar-divider" />
          <button 
            onClick={() => { setView('profile'); setIsMobileMenuOpen(false); }}
            className={`sidebar-nav-item ${view === 'profile' ? 'active' : ''}`}
          >
            <User size={22} />
            <span>My Profile</span>
          </button>
          <button onClick={handleLogout} className="sidebar-nav-item logout-btn">
            <LogOut size={22} />
            <span>Sign Out</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <Clock size={12} />
          <span>{formattedDate}</span>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
