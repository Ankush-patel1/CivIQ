import { 
  LayoutDashboard, Milestone, GraduationCap, ShieldAlert, 
  MessageSquare, History, MapPin, Vote, ShieldCheck 
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home',    Icon: LayoutDashboard },
  { id: 'journey',   label: 'Journey', Icon: Milestone },
  { id: 'edu',       label: 'Learn',   Icon: GraduationCap },
  { id: 'rumor',     label: 'Check',   Icon: ShieldAlert },
  { id: 'chat',      label: 'Ask AI',  Icon: MessageSquare },
  { id: 'timeline',  label: 'Dates',   Icon: History },
  { id: 'booth',     label: 'Booths',  Icon: MapPin },
  { id: 'elections', label: 'States',  Icon: Vote },
  { id: 'security',  label: 'Safety',  Icon: ShieldCheck },
];
