import React from 'react';
import { Select } from '@mantine/core';

import { firestore } from '../../lib/auth/firebase';
import { useCollection } from 'react-firebase-hooks/firestore'


const ChooseClubDropdown = ({ club, setClub, defaultValue, ...props }) => {
  const allClubsRef = firestore.collection('clubs');
  const allActiveClubsQuery = allClubsRef.where('isActive', '==', true);
  const [allActiveClubsSnapshot, allActiveClubsSnapshotLoading] = useCollection(allActiveClubsQuery);

  const allActiveClubs = allActiveClubsSnapshot?.docs.map(club => {
    return {
      id: club.id,
      ...club.data()
    }
  });


  return (
    <>
      {allActiveClubs &&
        <Select
          searchable
          nothingFound="Не найдено"
          name='club'
          id='clubs'
          onChange={setClub} value={club} {...props}
          placeholder={defaultValue}
          data={allActiveClubs?.map(club => {
            return { value: club.id, label: club.name }
          })}
          size="xs"
        />
      }
    </>
  );
};

export default ChooseClubDropdown;