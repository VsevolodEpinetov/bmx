import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useContext, useState, useEffect } from 'react';

// auth
import AuthCheck from '../components/AuthCheck';
import { auth, firestore } from '../lib/auth/firebase';
import { useDocumentData, useCollectionData, useCollection } from 'react-firebase-hooks/firestore'
import { UserContext } from '../lib/auth/context';
import AdminPanel from '../components/AdminPanel';

export default function Home() {
  const { user, userData } = useContext(UserContext);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR &&
    <div >
      <AuthCheck>
        {userData?.isAdmin &&
          <>
            <AdminPanel 
              user={user}
              userData={userData}
            />
          </>
        }
      </AuthCheck>
    </div>
  )
}


function Greeting() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid);
  const [info, infoLoading] = useDocumentData(ref);

  return (
    <>
      {info && <h1>Привет, {info.name}</h1>}
      {infoLoading && <p>Загрузка...</p>}
    </>
  )

}