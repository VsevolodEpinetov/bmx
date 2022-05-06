import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useContext, useState, useEffect } from 'react';

// auth
import AuthCheck from '../components/AuthCheck';
import { auth, firestore } from '../lib/auth/firebase';
import { useDocumentData, useCollectionData, useCollection } from 'react-firebase-hooks/firestore'
import { UserContext } from '../lib/auth/context';

export default function Home() {
  const { user } = useContext(UserContext);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR &&
    <div>
      <main>
        <h1>
          Приветствую на BikeJS!
        </h1>

        <p>
          <AuthCheck>
            <p>Есть пользователь!</p>
            <p>{user && user.email}, {user && user.uid}</p>
            <a href='/profile'>Личный кабинет</a>
            <br/>
            <button
              onClick={async (e) => {
                e.preventDefault();
                auth.signOut()
              }}
            >
              Вылогиниться
            </button>
          </AuthCheck>
        </p>
      </main>

      <footer>
        <a
          href="epinetov.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Epinetov
        </a>
      </footer>
    </div>
  )
}
