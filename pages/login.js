/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";

import { auth, firestore, googleAuthProvider } from '../lib/auth/firebase';
import { UserContext } from '../lib/auth/context'

export default function LoginPage({ }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, userName } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');


  return (
    <div>
      {!user && (
        <form>
          <input
            id="email"
            placeholder="Почта"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="pass"
            placeholder="Пароль"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button disabled={email === '' || password === ''}
              onClick={async (e) => {
                e.preventDefault();
                await auth
                  .signInWithEmailAndPassword(email, password)
                  .then(function () {
                    window.location.href = '/'
                  })
                  .catch(function (error) {
                    setMessage(error.message);
                    setOpen(true);
                  })
              }}>
              Пустите
            </button>
          </div>
        </form>
      )}
      {user && (
        <>
          Иди на главную, дружок-пирожок
        </>
      )}
      {message}
    </div>
  );
}