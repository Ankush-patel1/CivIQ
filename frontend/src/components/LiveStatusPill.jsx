import { Calendar, Clock } from 'lucide-react';

export default function LiveStatusPill({ currentTime, className = "" }) {
  return (
    <div className={`live-status-pill ${className}`} role="status" aria-live="polite">
      <div className="pulse-dot" aria-hidden="true"></div>
      <span className="text-sm font-bold">Live Verification Active</span>
      <span className="opacity-20 mx-2" aria-hidden="true">|</span>
      <Calendar size={14} className="opacity-60" aria-hidden="true" />
      <span>{currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
      <Clock size={14} className="ml-2 opacity-60" aria-hidden="true" />
      <span>{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  );
}
