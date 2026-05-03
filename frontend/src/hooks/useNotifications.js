import { useState, useEffect } from 'react';
import { messaging, db } from '../firebaseConfig';
import { onMessage, getToken } from 'firebase/messaging';
import { doc, updateDoc } from 'firebase/firestore';
import { STATE_ELECTIONS } from '../data/electionData';

export const useNotifications = (user, profile) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!user) return;

    // FCM Message Listener
    const unsubscribeMessage = onMessage(messaging, (payload) => {
      setNotification({
        title: payload.notification.title,
        message: payload.notification.body,
        id: Date.now()
      });
    });

    // Request FCM Permission
    if (user && !profile?.fcmToken) {
      requestPermission(user.uid);
    }

    // State Election Proximity Notification
    if (profile?.location) {
      const state = profile.location;
      const upcoming = STATE_ELECTIONS.find(e => e.state === state && e.status === 'Upcoming');
      if (upcoming) {
        setNotification({
          title: `${upcoming.state} Elections ${upcoming.year}`,
          message: `Important dates for your state have been updated.`,
          id: upcoming.state
        });
      }
    }

    return () => unsubscribeMessage();
  }, [user, profile]);

  const requestPermission = async (uid) => {
    try {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
      }
      
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });
      if (token) {
        await updateDoc(doc(db, "users", uid), { fcmToken: token });
      }
    } catch (err) {
      console.warn("FCM registration skipped or failed");
    }
  };

  return { notification, setNotification };
};
