import React, { useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ChooseClubDropdown from './Inputs/ChooseClubDropdown';

import { firestore } from '../lib/auth/firebase';

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
    <div>
      {user.surname} {user.name} {user.patronymic} | 
      <span style={{ display: wantToChangeClub ? 'none' : 'inline' }}> {clubInfo?.name} <button onClick={changeVisibility} >Изменить клуб?</button></span> 
      <span style={{ display: wantToChangeClub ? 'inline' : 'none' }}>
        <ChooseClubDropdown defaultValue='Выбери новый клуб' club={newClub} setClub={setNewClub} />
        <button onClick={changeVisibility}>X</button>
      </span>|
      <input type="checkbox" id="isMain" name="isMain" checked={isMainChecked} onChange={(e) => setIsMainChecked(e.target.checked)}/> <label htmlFor="isMain"> Главный тренер?</label>
      <button onClick={approveUser}>Подтвердить</button>
      <button onClick={deleteUser}>Удалить</button>
    </div>
  );
}

export default UserWaitingForApproval;