import React, { useState } from 'react';
import ChooseClubDropdown from './Inputs/ChooseClubDropdown';
import CredentialsInputs from './Inputs/CredentialsInputs';
import TrainerInfoInputs from './Inputs/TrainerInfoInputs';

import { auth, firestore } from '../auth/firebase';

async function createNewTrainer ({mail, password}, trainerData, setErrorMessage) {
  await auth
  .createUserWithEmailAndPassword(mail, password)
  .then(async function (justCreatedUserData) {
    await firestore
      .collection('users')
      .doc(justCreatedUserData.user.uid)
      .set(trainerData)
      .catch(function (error) {
        setErrorMessage(error.message);
      })
      .then(() => {
        window.location.href = '/'
      })
  })
  .catch(function (error) {
    setErrorMessage(error.message);
  })
  //setErrorMessage(`created ${mail}:${password}, ${JSON.stringify(trainerData)}`)
}

const RegTrainerForm = ({setErrorMessage}) => {
  const [credentials, setCredentials] = useState({
    mail: '',
    password: ''
  });
  const [trainer, setTrainer] = useState({
    name: '',
    surname: '',
    patronymic: '',
    club: '',
    phone: '+7'
  })

  const [club, setClub] = useState('')

  const createTrainer = async (e) => {
    e.preventDefault();
    const clubRef = await firestore.collection('clubs').doc(club);

    const newUser = {
      ...trainer,
      athletes: [],
      club: clubRef,
      isApproved: false,
      isMain: false
    }

    createNewTrainer(credentials, newUser, setErrorMessage)
  }

  return (
    <form>
      <CredentialsInputs 
        credentials={credentials}
        setCredentials={setCredentials}
      />
      <hr/>
      <TrainerInfoInputs
        trainer={trainer}
        setTrainer={setTrainer}
      />
      <ChooseClubDropdown
        club={club}
        setClub={setClub}
        defaultValue='Выбери клуб'
      />
      <div>
        <button disabled={credentials.mail === '' || credentials.password === ''}
          onClick={createTrainer}>
          Зарегистрируйте
        </button>
      </div>
    </form>
  );
};

export default RegTrainerForm;