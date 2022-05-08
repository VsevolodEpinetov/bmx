import React, { useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ChooseClubDropdown from './Inputs/ChooseClubDropdown';
import { Button, Checkbox, Grid } from '@mantine/core';

import { firestore } from '../lib/auth/firebase';
import { UserCheck, UserX, X } from 'tabler-icons-react';

const UserWaitingForApproval = ({ user }) => {
  const [clubInfo, clubLoading] = useDocumentData(user.club);
  const [newClub, setNewClub] = useState('')
  const [isMainChecked, setIsMainChecked] = useState(false)
  const [wantToChangeClub, setWantToChangeClub] = useState(false)

  const approveUser = async (e) => {
    e.preventDefault();

    const newInfo = {
      isMain: isMainChecked,
      isApproved: true
    }

    const chosenClubIsValidAndNew = newClub && newClub !== user.club.id;
    if (wantToChangeClub && chosenClubIsValidAndNew) {
      newInfo.club = firestore.collection('clubs').doc(newClub)
    }


    await firestore
      .collection('users')
      .doc(user?.uid)
      .update(newInfo)
  }

  const deleteUser = async (e) => {
    e.preventDefault();

    await firestore
      .collection('users')
      .doc(user?.uid)
      .update({
        isDeleted: true
      })
  }

  const changeVisibility = () => {
    setWantToChangeClub(!wantToChangeClub);
  }

  return (
    <tr>
      <td>{user.surname} {user.name} {user.patronymic}</td>
      <td>
        <span style={{ display: wantToChangeClub ? 'none' : 'block' }}> {clubInfo?.name} <Button compact variant="subtle" onClick={changeVisibility} >Изменить?</Button></span>
        <span style={{ display: wantToChangeClub ? 'block' : 'none' }}>
        <Grid>
          <Grid.Col span={9}><ChooseClubDropdown defaultValue='Выбери новый клуб' club={newClub} setClub={setNewClub} size='xs'/> </Grid.Col>
          <Grid.Col span={3}><Button compact variant="subtle" onClick={changeVisibility}><X/></Button></Grid.Col>
        </Grid>
        </span>
      </td>
      <td><Checkbox id="isMain" name="isMain" checked={isMainChecked} onChange={(e) => setIsMainChecked(e.target.checked)} label="Главный тренер"/></td>
      <td><Button leftIcon={<UserCheck />} onClick={approveUser} color="green">Подтвердить</Button></td>
      <td><Button leftIcon={<UserX />} onClick={deleteUser} color='red'>Удалить</Button></td>
    </tr>
  );
}

export default UserWaitingForApproval;