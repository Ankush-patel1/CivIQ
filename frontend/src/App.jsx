import { useState, useEffect } from 'react';
import { HomeIcon, MapIcon, ClockIcon, ChatIcon, UserIcon, BookIcon } from './Icons';
import Onboarding from './Onboarding';
import Dashboard  from './Dashboard';
import Journey    from './Journey';
import Timeline   from './Timeline';
import Chat       from './Chat';
import Profile    from './Profile';

const NAV_ITEMS = [
  { id:'dashboard', label:'Home',    Icon: HomeIcon  },
  { id:'journey',   label:'Steps',   Icon: MapIcon   },
  { id:'timeline',  label:'Dates',   Icon: ClockIcon },
  { id:'chat',      label:'Ask AI',  Icon: ChatIcon  },
  { id:'profile',   label:'Profile', Icon: UserIcon  },
];

export default function App() {
  const [view, setView] = useState('onboarding');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('civiq_user');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) { setUser(JSON.parse(saved)); setView('dashboard'); }
  }, []);

  const handleComplete = (profile) => {
    localStorage.setItem('civiq_user', JSON.stringify(profile));
    setUser(profile);
    setView('dashboard');
  };

  const handleUpdateUser = (updatedProfile) => {
    localStorage.setItem('civiq_user', JSON.stringify(updatedProfile));
    setUser(updatedProfile);
  };

  const handleReset = () => {
    localStorage.removeItem('civiq_user');
    setUser(null);
    setView('onboarding');
  };

  if (view === 'onboarding') return <Onboarding onComplete={handleComplete} />;

  return (
    <div style={{ minHeight:'100vh', background:'#0b1326', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'fixed', top:'-150px', left:'-150px', width:'500px', height:'500px', pointerEvents:'none', zIndex:0, borderRadius:'50%', filter:'blur(130px)', background:'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)' }} />
      <div style={{ position:'fixed', bottom:'-100px', right:'-100px', width:'450px', height:'450px', pointerEvents:'none', zIndex:0, borderRadius:'50%', filter:'blur(130px)', background:'radial-gradient(circle, rgba(14,165,233,0.13) 0%, transparent 70%)' }} />

      <header className="desktop-nav" style={{
        position:'fixed', top:0, left:0, right:0, zIndex:50,
        background:'rgba(11,19,38,0.90)', backdropFilter:'blur(24px)',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 40px', height:'68px',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={() => setView('dashboard')}>
          <div style={{ background:'linear-gradient(135deg,#4f46e5,#0ea5e9)', padding:'9px', borderRadius:'13px', flexShrink:0 }}>
            <BookIcon size={20} style={{ color:'#fff' }} />
          </div>
          <span style={{ fontSize:'22px', fontWeight:900, background:'linear-gradient(90deg,#c3c0ff,#89ceff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            CivIQ
          </span>
        </div>

        <nav style={{ display:'flex', alignItems:'center', gap:'4px', background:'rgba(255,255,255,0.04)', padding:'6px', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.07)' }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              style={{
                display:'flex', alignItems:'center', gap:'7px',
                padding:'9px 18px', borderRadius:'11px', fontFamily:'inherit',
                fontSize:'14px', fontWeight:700, cursor:'pointer', border:'none',
                background: view === id ? 'rgba(79,70,229,0.35)' : 'transparent',
                color: view === id ? '#c3c0ff' : '#918fa1',
                transition:'all 0.2s',
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ fontSize:'13px', fontWeight:700, color:'#c7c4d8', background:'rgba(255,255,255,0.06)', padding:'8px 14px', borderRadius:'9999px', border:'1px solid rgba(255,255,255,0.09)', display:'flex', alignItems:'center', gap:'6px' }}>
            <span>📍</span> {user?.location}
          </div>
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'linear-gradient(135deg,#4f46e5,#0ea5e9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', cursor:'pointer' }} onClick={() => setView('profile')}>
            👤
          </div>
        </div>
      </header>

      {view !== 'chat' && (
        <header className="mobile-nav-top" style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50,
          background:'rgba(11,19,38,0.90)', backdropFilter:'blur(20px)',
          borderBottom:'1px solid rgba(255,255,255,0.07)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 20px', height:'60px',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ background:'linear-gradient(135deg,#4f46e5,#0ea5e9)', padding:'8px', borderRadius:'12px' }}>
              <BookIcon size={18} style={{ color:'#fff' }} />
            </div>
            <span style={{ fontSize:'20px', fontWeight:900, background:'linear-gradient(90deg,#c3c0ff,#89ceff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              CivIQ
            </span>
          </div>
          <div style={{ fontSize:'12px', fontWeight:700, color:'#c7c4d8', background:'rgba(255,255,255,0.06)', padding:'6px 12px', borderRadius:'9999px', border:'1px solid rgba(255,255,255,0.09)' }}>
            📍 {user?.location}
          </div>
        </header>
      )}

      <main className="main-content" style={{ flex:1, position:'relative', zIndex:1, overflowY:'auto' }}>
        {view === 'dashboard' && <Dashboard user={user} navigateTo={setView} />}
        {view === 'journey'   && <Journey   user={user} onUpdateUser={handleUpdateUser} />}
        {view === 'timeline'  && <Timeline />}
        {view === 'chat'      && <Chat      user={user} />}
        {view === 'profile'   && <Profile   user={user} onReset={handleReset} />}
      </main>

      <div className="mobile-bottom-nav" style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:50 }}>
        <div style={{ margin:'0 12px 12px', borderRadius:'20px', padding:'6px 8px', display:'flex', justifyContent:'space-around', background:'rgba(15,22,45,0.95)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.10)', boxShadow:'0 -4px 30px rgba(0,0,0,0.40)' }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              style={{
                display:'flex', flexDirection:'column', alignItems:'center', gap:'3px',
                padding:'8px 12px', borderRadius:'14px', cursor:'pointer', border:'none', fontFamily:'inherit',
                background: view === id ? 'rgba(79,70,229,0.22)' : 'transparent',
                color: view === id ? '#c3c0ff' : '#918fa1',
                fontSize:'10px', fontWeight:700, letterSpacing:'0.03em', transition:'all 0.2s',
              }}
            >
              <Icon size={22} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
