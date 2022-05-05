import React from 'react';

import { firestore } from '../../auth/firebase';
import { useCollection } from 'react-firebase-hooks/firestore'


const ChooseClubDropdown = ({club, setClub, defaultValue}) => {
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
        <select name='club' id='clubs' onChange={(e) => setClub(e.target.value)} value={club}>
          <option disabled value="">{defaultValue}</option>
          {allActiveClubs?.map(club => <option value={club.id} key={`club-${club.id}`}>{club.name}</option>)}
        </select>
      }
    </>
  );
};

export default ChooseClubDropdown;