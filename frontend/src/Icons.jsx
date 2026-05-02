
// ---- Icons (inline SVG to avoid extra deps) ----
const Icon = ({ d, size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d={d} /></svg>
);
const HomeIcon   = (p) => <Icon {...p} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />;
const MapIcon    = (p) => <Icon {...p} d="M3 7l6-4 6 4 6-4v14l-6 4-6-4-6 4V7z" />;
const ClockIcon  = (p) => <Icon {...p} d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l4 2" />;
const ChatIcon   = (p) => <Icon {...p} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />;
const UserIcon   = (p) => <Icon {...p} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" />;
const CheckIcon  = (p) => <Icon {...p} d="M20 6L9 17l-5-5" />;
const LockIcon   = (p) => <Icon {...p} d="M19 11H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2zm-7-4a4 4 0 00-4 4v1h8V11a4 4 0 00-4-4z" />;
const SendIcon   = (p) => <Icon {...p} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />;
const ChevronDown= (p) => <Icon {...p} d="M6 9l6 6 6-6" />;
const ChevronUp  = (p) => <Icon {...p} d="M18 15l-6-6-6 6" />;
const ChevronRight=(p) => <Icon {...p} d="M9 18l6-6-6-6" />;
const AlertIcon  = (p) => <Icon {...p} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />;
const InfoIcon   = (p) => <Icon {...p} d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 8h.01M12 12v4" />;
const BookIcon   = (p) => <Icon {...p} d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z" />;
const SpinnerIcon= () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin" style={{animationDuration:'0.8s'}}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

export { HomeIcon, MapIcon, ClockIcon, ChatIcon, UserIcon, CheckIcon, LockIcon, SendIcon, ChevronDown, ChevronUp, ChevronRight, AlertIcon, InfoIcon, BookIcon, SpinnerIcon };
