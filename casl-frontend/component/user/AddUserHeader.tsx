import { useState } from 'react';
import { ACTIONS, SUBJECTS } from '../../config/Constants';
import Protected from '../authentication';
import Button from '../ui/Button';
import AddUserModal from './AddUserModal';

export default function AddUserHeader({ permissions }: any) {
  const [showModal, setShowModal] = useState(false);
  return (
    <Protected a={SUBJECTS.USERS} permissions={permissions} I={ACTIONS.CREATE}>
      <section style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          text={'Add User'}
          type={'primary'}
          onClick={() => setShowModal(!showModal)}
        />
        {showModal && <AddUserModal />}
      </section>
    </Protected>
  );
}
