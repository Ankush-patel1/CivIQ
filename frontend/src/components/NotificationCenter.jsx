import { useState } from 'react';
import { Bell, AlertTriangle, Info, Calendar, X } from 'lucide-react';
import { STATE_ELECTIONS } from '../data/electionData';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Voter Registration Deadline',
      message: 'Deadline for Bihar state elections registration is approaching in 15 days.',
      time: '2 hours ago',
      icon: <AlertTriangle className="text-amber-400" size={18} />
    },
    {
      id: 2,
      type: 'info',
      title: 'Polling Station Update',
      message: 'New polling stations added in Patna district. Check the map for details.',
      time: '5 hours ago',
      icon: <Info className="text-blue-400" size={18} />
    },
    {
      id: 3,
      type: 'election',
      title: 'Delhi Elections 2025',
      message: 'Tentative dates for Delhi assembly elections announced for February 2025.',
      time: '1 day ago',
      icon: <Calendar className="text-indigo-400" size={18} />
    }
  ]);

  const upcomingStates = STATE_ELECTIONS.filter(s => s.status === 'Upcoming');

  return (
    <div className="notification-center-trigger">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="notification-bell-btn glass"
        aria-label="Toggle notifications"
      >
        <Bell size={22} className={notifications.length > 0 ? "text-indigo-400" : "text-gray-400"} />
        {notifications.length > 0 && (
          <span className="notification-dot animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="notification-dropdown glass-strong animate-scale-in">
            <div className="notification-header">
              <h3>
                <Bell size={18} className="text-indigo-400" />
                Notifications
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="notification-list no-scrollbar">
              {upcomingStates.length > 0 && (
                <div className="upcoming-elections-section">
                  <p className="upcoming-label">
                    <Calendar size={12} /> Upcoming State Elections
                  </p>
                  <div className="flex flex-col gap-2">
                    {upcomingStates.map(state => (
                      <div key={state.state} className="state-election-card">
                        <div className="state-election-header">
                          <span className="state-name">{state.state}</span>
                          <span className="election-date-badge">{state.month} {state.year}</span>
                        </div>
                        <p className="text-[11px] text-indigo-200/60 mb-2">{state.update}</p>
                        <button className="w-full py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-[10px] font-bold text-indigo-300 transition-colors uppercase tracking-tight">
                          Set Reminder
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className="notification-item"
                >
                  <div className="flex gap-4">
                    <div className="notification-icon-container">
                      {notif.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="notification-title">{notif.title}</h4>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                      <p className="notification-message">{notif.message}</p>
                      <div className="notification-actions">
                         <button className="text-[10px] font-bold text-indigo-400 hover:underline">Mark as read</button>
                         <button className="text-[10px] font-bold text-indigo-400 hover:underline">View details</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {notifications.length === 0 && (
                <div className="p-12 text-center">
                  <Bell size={40} className="mx-auto text-gray-700 mb-3 opacity-20" />
                  <p className="text-gray-500 text-sm font-medium">All caught up!</p>
                </div>
              )}
            </div>

            <div className="notification-footer">
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                View all activity
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;

