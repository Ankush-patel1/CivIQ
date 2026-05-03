import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { bypassAuth } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card animate-scale-in">
        <div className="animate-float logo-glow login-logo-glow">
          <CheckCircle size={36} color="#fff" />
        </div>
        
        <div className="login-header">
          <h1>CivIQ</h1>
          <p>Your intelligent companion for the world's largest democracy.</p>
        </div>

        {error && (
          <div className="error-box">
            <span>{error}</span>
            {error.includes('configuration-not-found') && (
              <span style={{ fontSize: '11px', color: '#fff' }}>
                Fix: Go to Firebase Console → Authentication → Sign-in method → Enable "Email/Password".
              </span>
            )}
          </div>
        )}

        <div className="mode-toggle">
          <button 
            onClick={() => setMode('login')}
            className={mode === 'login' ? 'active' : ''}
          >Login</button>
          <button 
            onClick={() => setMode('signup')}
            className={mode === 'signup' ? 'active' : ''}
          >Join</button>
        </div>

        <form onSubmit={handleEmailAuth} className="login-form">
          <input 
            type="email" 
            className="input-glass" 
            placeholder="Email Address" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            className="input-glass" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Authenticating...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">or</span>
          <div className="divider-line" />
        </div>

        <button className="btn-glass" onClick={handleGoogle} style={{ width:'100%', marginBottom: '12px' }}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="google-icon" />
          Continue with Google
        </button>

        <button className="btn-glass guest-btn" onClick={bypassAuth}>
          🚀 Continue as Guest (Dev Mode)
        </button>

        <p className="footer-note">
          By continuing, you agree to secure civic engagement and verified democratic participation.
        </p>
      </div>
    </div>
  );
}
