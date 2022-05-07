import React from 'react';
import { Table } from '@mantine/core';

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
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>ФИО</th>
          <th colSpan={2}>Клуб</th>
          <th colSpan={2}>Действия</th>
        </tr>
      </thead>
      <tbody>
        {
          allUsersWaitingForApproval?.map(user => <UserWaitingForApproval user={user} />)
        }
      </tbody>
    </Table>
  );
};

export default UsersWaitingForApprovalList;