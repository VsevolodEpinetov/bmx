import React from 'react';

// auth
import { firestore } from '../lib/auth/firebase';
import { useCollection } from 'react-firebase-hooks/firestore'
import UserWaitingForApproval from './UserWaitingForApproval';

const UsersWaitingForApprovalList = ({ user }) => {
  const allUsersRef = firestore.collection('users');
  const allUsersWaitingForApprovalQuery = allUsersRef.where('isApproved', '==', false).where('isDeleted', '==', false);
  const [allUsersWaitingForApprovalSnapshot, allUsersWaitingForApprovalSnapshotLoading] = useCollection(allUsersWaitingForApprovalQuery);

  const allUsersWaitingForApproval = allUsersWaitingForApprovalSnapshot?.docs.map(user => {
    return {
      uid: user.id,
      ...user.data()
    }
  });

  return (
    <div>
      {
        allUsersWaitingForApproval?.map(user => <UserWaitingForApproval user={user} />)
      }
    </div>
  );
};

export default UsersWaitingForApprovalList;