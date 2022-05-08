import React, { useMemo, useState } from 'react';
import ChooseClubDropdown from './Inputs/ChooseClubDropdown';
import CredentialsInputs from './Inputs/CredentialsInputs';
import TrainerInfoInputs from './Inputs/TrainerInfoInputs';

import { Button, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { EyeCheck, EyeOff } from 'tabler-icons-react';

import { auth, firestore } from '../lib/auth/firebase';

async function createNewTrainer({ mail, password }, trainerData, setErrorMessage) {
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
}

const RegTrainerForm = ({ setErrorMessage }) => {
  const [credentials, setCredentials] = useState({
    mail: '',
    password: ''
  });
  const [trainer, setTrainer] = useState({
    name: '',
    surname: '',
    patronymic: '',
    club: '',
    phone: '+7 () --'
  })
  const [club, setClub] = useState('')
  const [triedToSubmit, setTriedToSubmit] = useState(false);

  const blankFields = useMemo(() => {
    let somethingIsWrong = [];
    if (triedToSubmit) {
      for (const [field, value] of Object.entries(trainer)) {
        if (value.length == 0 && field !== 'club') somethingIsWrong.push(field)
      }
      if (club.length == 0) somethingIsWrong.push('club') // it really IS needed to be checked separately, trust me
      if (trainer.phone.length < 9) somethingIsWrong.push('phone')

      if (!credentials.mail.includes('@') || !credentials.mail.includes('.')) somethingIsWrong.push('mail')

      if (credentials.password.length < 8) somethingIsWrong.push('password')
      const requirements = [ /[0-9]/, /[a-z]/, /[A-Z]/ ];
      requirements.forEach((r) => {
        if (!r.test(credentials.password)) {
          somethingIsWrong.push('password')
        }
      });

    }
    return somethingIsWrong;
  }, [trainer, club, triedToSubmit, credentials])


  const checkFormAndSubmit = async (e) => {
    e.preventDefault();
    if (!triedToSubmit) {
      for (const [field, value] of Object.entries(trainer)) {
        if (value.length == 0 && field !== 'club') blankFields.push(field)
      }
      if (club.length == 0) blankFields.push('club') // it really IS needed to be checked separately, trust me
      if (trainer.phone.length < 9) blankFields.push('phone')
      if (!credentials.mail.includes('@') || !credentials.mail.includes('.')) blankFields.push('mail')
      if (credentials.password.length < 8) blankFields.push('password')
      const requirements = [ /[0-9]/, /[a-z]/, /[A-Z]/ ];
      requirements.forEach((r) => {
        if (!r.test(credentials.password)) {
          blankFields.push('password')
        }
      });
    }
    setTriedToSubmit(true);
    if (blankFields.length == 0) createTrainer(e);
  }

  const createTrainer = async (e) => {
    const clubRef = await firestore.collection('clubs').doc(club);
    const newUser = {
      ...trainer,
      athletes: [],
      club: clubRef,
      isApproved: false,
      isMain: false,
      isDeleted: false,
      roles: ['trainer']
    }

    createNewTrainer(credentials, newUser, setErrorMessage)
  }

  return (
    <form>
      <Grid style={{padding: '50px'}}>
        <Grid.Col span={6}>
          <CredentialsInputs
            credentials={credentials}
            setCredentials={setCredentials}
            blankFields={blankFields}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TrainerInfoInputs
            trainer={trainer}
            setTrainer={setTrainer}
            blankFields={blankFields}
          />
          <span style={{display: 'inline-block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: '#212529'}}>Клуб <span style={{color: '#f03e3e'}}>*</span></span>
          <ChooseClubDropdown
            club={club}
            setClub={setClub}
            isBlank={blankFields.includes('club')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button fullWidth onClick={checkFormAndSubmit} disabled={credentials.mail === '' || credentials.password === ''}>
            Зарегистрироваться
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default RegTrainerForm;