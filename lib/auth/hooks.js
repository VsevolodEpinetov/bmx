import { auth, firestore } from '../auth/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, userLoading] = useAuthState(auth);
  /*const [userData, setUserData] = useState({
    name: null,
    surname: null,
    patronymic: null,
    isAdmin: null,
    isJudge: null
  })*/
  const [userName, setUserName] = useState(null)
  const [userSurname, setUserSurname] = useState(null)
  const [userPatronymic, setUserPatronymic] = useState(null)
  const [userIsAdmin, setUserIsAdmin] = useState(null)
  const [userIsJudge, setUserIsJudge] = useState(null)


  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user && !userLoading) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot(async (doc) => {
        const info = doc.data();
        //setUserData({name: info.name, ...userData})
        setUserName(doc.data()?.name);
        setUserSurname(doc.data()?.surname)
        setUserPatronymic(doc.data()?.patronymic)
        setUserIsAdmin(doc.data()?.roles.includes('admin'))
        setUserIsJudge(doc.data()?.roles.includes('judge'))
      });
    } else {
      setUserName(null);
      setUserSurname(null)
      setUserPatronymic(null)
      setUserIsAdmin(null)
      setUserIsJudge(null)
    }

    return unsubscribe;
  }, [user]);

  let userData = {
    name: userName,
    surname: userSurname,
    patronymic: userPatronymic,
    isAdmin: userIsAdmin,
    isJudge: userIsJudge
  }

  return { user, userData };
}