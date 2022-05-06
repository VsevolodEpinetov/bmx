import { auth, firestore } from '../auth/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, userLoading] = useAuthState(auth);
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    isAdmin: false,
    isJudge: false
  })
  

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUserData({...userData, name: doc.data()?.name})
        setUserData({...userData, surname: doc.data()?.surname})
        setUserData({...userData, patronymic: doc.data()?.patronymic})
        if (doc.data()?.roles.includes('admin')) setUserData({...userData, isAdmin: true})
        if (doc.data()?.roles.includes('judge')) setUserData({...userData, isJudge: true})
      });
    } else {
      setUserData({
        name: '',
        surname: '',
        patronymic: '',
        isAdmin: false,
        isJudge: false
      })
    }

    return unsubscribe;
  }, [user]);

  return { user, userData };
}