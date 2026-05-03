import { MessageSquare } from 'lucide-react';

const BottomNav = ({ navItems, view, setView }) => {
  return (
    <nav className="mobile-bottom-nav glass-strong" role="navigation" aria-label="Mobile Bottom Menu">
      <div className="bottom-nav-grid">
        {navItems.slice(0, 4).map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`mobile-nav-btn ${view === id ? 'active' : ''}`}
          >
            <Icon size={22} />
            <span>{label}</span>
          </button>
        ))}
        <button 
          onClick={() => setView('chat')} 
          className={`mobile-nav-btn ${view === 'chat' ? 'active' : ''}`}
        >
          <MessageSquare size={22} />
          <span>AI</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
