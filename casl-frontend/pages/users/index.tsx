import Head from 'next/head';
import { useEffect, useState } from 'react';
import Protected from '../../component/authentication';
import UserList from '../../component/user/UserList';
import Button from '../../component/ui/Button';
import { SUBJECTS } from '../../config/Constants';
import { BoxCenterV } from '../../component/ui/layouts/Box';
import AddUserModal from '../../component/user/AddUserModal';

export default function Users() {
  const [permissions, setPermissions] = useState('');
  useEffect(() => {
    const p = localStorage.getItem('permissions');
    if (p) {
      setPermissions(JSON.parse(p));
    }
  }, []);
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div>
      <Head>
        <title>Users</title>
        <meta name='description' content='Manage users here' />
      </Head>
      <section style={{ textAlign: 'center', padding: '40px' }}>
        <Protected
          a={SUBJECTS.USERS}
          permissions={permissions}
          unauthorized={true}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <section>
              <h1 style={{ fontWeight: '300' }}>Application Users</h1>
            </section>
            <BoxCenterV>
              <Protected a={'Users'} I='create' permissions={permissions}>
                <Button
                  text={'Add Users'}
                  type={'secondary'}
                  onClick={() => setShowAddUser(!showAddUser)}
                />
              </Protected>
            </BoxCenterV>
          </div>
          <UserList permissions={permissions} />
          {showAddUser && <AddUserModal closeModal={() => setShowAddUser(false)}/>}
        </Protected>
      </section>
    </div>
  );
}
