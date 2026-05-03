import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Bell, X } from 'lucide-react';
import { auth, db } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { useAuth } from './context/AuthContext';
import { useNotifications } from './hooks/useNotifications';

// View Components - Lazy Loaded for efficiency
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Journey = lazy(() => import('./pages/Journey'));
const VoterEducation = lazy(() => import('./pages/VoterEducation'));
const RumorMill = lazy(() => import('./pages/RumorMill'));
const Chat = lazy(() => import('./components/Chat'));
const Timeline = lazy(() => import('./pages/Timeline'));
const ConstituencyMap = lazy(() => import('./pages/ConstituencyMap'));
const StateElections = lazy(() => import('./pages/StateElections'));
const SecurityCenter = lazy(() => import('./pages/SecurityCenter'));
const Profile = lazy(() => import('./pages/Profile'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// Layout Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Loader from './components/Loader';
import LiveStatusPill from './components/LiveStatusPill';
import { NAV_ITEMS } from './config/navigation';

export default function App() {
  const { user, profile, setProfile, loading: authLoading } = useAuth();
  const [view, setView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { notification, setNotification } = useNotifications(user, profile);

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleNavigate = (e) => setView(e.detail);
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      if (view !== 'login') setView('login');
      return;
    }

    if (!profile && view !== 'onboarding') {
      setView('onboarding');
      return;
    }

    if (view === 'login' && profile) {
      setView('dashboard');
    }

    // SW Registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(() => console.log('FCM Service Worker registered'))
        .catch(err => console.warn('SW registration failed', err));
    }
  }, [user, profile, view, authLoading]);

  const handleOnboardingComplete = async (data) => {
    if (!user) return;
    const newProfile = { ...data, uid: user.uid, email: user.email, createdAt: new Date() };
    await setDoc(doc(db, "users", user.uid), newProfile);
    setProfile(newProfile);
    setView('dashboard');
  };

  const handleUpdateUser = async (updatedData) => {
    if (!user) return;
    setProfile(updatedData);
    await setDoc(doc(db, "users", user.uid), updatedData, { merge: true });
  };

  const handleLogout = () => signOut(auth);

  const formattedDate = useMemo(() => {
    return currentTime.toLocaleDateString('en-IN', { 
      day: 'numeric', month: 'short', year: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
  }, [currentTime]);

  if (authLoading) return <Loader fullScreen message="CIVIQ IS LOADING..." />;

  if (view === 'login') return (
    <Suspense fallback={<Loader />}>
      <LoginPage />
    </Suspense>
  );

  if (view === 'onboarding') return (
    <Suspense fallback={<Loader />}>
      <Onboarding onComplete={handleOnboardingComplete} />
    </Suspense>
  );

  return (
    <div className="app-container">
      {/* Background Decor */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      {/* Main Header */}
      <Header 
        setView={setView}
        view={view}
        profile={profile}
        user={user}
        formattedDate={formattedDate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={NAV_ITEMS}
      />

      {/* Content Area */}
      <main id="main-content" className="main-content" role="main" tabIndex="-1">
        <div className="page-container">
          <LiveStatusPill currentTime={currentTime} className="mt-6" />
          {notification && (
            <div className="notification-banner animate-fade-in" role="status">
              <div className="banner-icon"><Bell size={20} /></div>
              <div className="banner-content">
                <strong className="banner-title">{notification.title}</strong>
                <p className="banner-text">{notification.message}</p>
              </div>
              <button 
                className="banner-close" 
                onClick={() => setNotification(null)}
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div key={view} className="page-transition-wrapper">
            <Suspense fallback={<Loader message={`Loading ${view}...`} />}>
              {view === 'dashboard' && <Dashboard user={profile} navigateTo={setView} currentTime={currentTime} />}
              {view === 'journey'   && <Journey   user={profile} onUpdateUser={handleUpdateUser} />}
              {view === 'edu'       && <VoterEducation />}
              {view === 'rumor'     && <RumorMill currentTime={currentTime} />}
              {view === 'chat'      && <Chat      user={profile} />}
              {view === 'timeline'  && <Timeline currentTime={currentTime} />}
              {view === 'booth'     && <ConstituencyMap />}
              {view === 'elections' && <StateElections user={profile} currentTime={currentTime} />}
              {view === 'security'  && <SecurityCenter />}
              {view === 'profile'   && <Profile   user={profile} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />}
            </Suspense>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav 
        navItems={NAV_ITEMS}
        view={view}
        setView={setView}
      />

      {/* Mobile Sidebar Navigation */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setView={setView}
        view={view}
        user={user}
        profile={profile}
        handleLogout={handleLogout}
        navItems={NAV_ITEMS}
        formattedDate={formattedDate}
      />
    </div>
  );
}

