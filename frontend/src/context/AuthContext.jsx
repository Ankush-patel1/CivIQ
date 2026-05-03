
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [devUser, setDevUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (devUser) return; // Ignore Firebase if dev bypass is active
      try {
        if (u) {
          const docRef = doc(db, "users", u.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            setProfile(null);
          }
          setUser(u);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [devUser]);

  const bypassAuth = () => {
    const fakeUser = { uid: 'guest-123', email: 'guest@civiq.local' };
    setDevUser(fakeUser);
    setUser(fakeUser);
    setProfile({ name: 'Guest User', location: 'Delhi', status: 'registered' });
  };

  const value = {
    user,
    profile,
    setProfile,
    loading,
    bypassAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
