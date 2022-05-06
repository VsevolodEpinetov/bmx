/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";

import { auth, firestore, googleAuthProvider } from '../lib/auth/firebase';
import { UserContext } from '../lib/auth/context'
import RegTrainerForm from "../components/RegTrainerForm";

export default function LoginPage({ }) {
  const { user, userName } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');


  return (
    <div>
      {!user && <RegTrainerForm setErrorMessage={setErrorMessage}/>}
      {user && (
        <>
          Иди на <a href='/'>Главную</a>, дружок-пирожок
        </>
      )}
      {errorMessage}
    </div>
  );
}