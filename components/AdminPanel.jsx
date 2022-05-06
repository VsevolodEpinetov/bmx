import React from 'react';
import UsersWaitingForApprovalList from './UsersWaitingForApprovalList';

const AdminPanel = ({user, userData}) => {
  return userData.isAdmin && 
    <div>
      <h3>Ожидают подтверждения</h3>
      <UsersWaitingForApprovalList
        user={user}
      />
    </div>
  ;
};

export default AdminPanel;