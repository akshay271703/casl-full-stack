import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import Protected from '../../component/authentication';
import { SUBJECTS } from '../../config/Constants';
import { IPermissionList } from '../permissions';
import AddUserHeader from '../../component/user/AddUserHeader';
import UpdateUserModal from '../../component/user/UpdateUserModal';
import UserList from '../../component/user/UserList';

interface IUserList {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export default function Users() {
  const [permissions, setPermissions] = useState<IPermissionList[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectUser, setSelectedUser] = useState({ userId: '', name: '' });

  function handleOnUpdate(el: IUserList) {
    setSelectedUser({
      name: `${el.firstName} ${el.lastName}`,
      userId: el.id,
    });
    setShowAddUser(!showAddUser);
  }
  useEffect(() => {
    try {
      const { GET_LIST } = ApiMap.PERMISSION;
      api(GET_LIST.url, GET_LIST.method as TMethod).then((result) => {
        const apiResponse = result.data as IPermissionList[];
        setPermissions(apiResponse);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Users</title>
        <meta name='description' content='Manage users here' />
      </Head>
      <section style={{ textAlign: 'center' }}>
        <Protected
          a={SUBJECTS.USERS}
          permissions={permissions}
          unauthorized={true}
        >
          <h1>Users</h1>
          <AddUserHeader permissions={permissions} />
          {showAddUser && (
            <UpdateUserModal
              permissions={permissions}
              selectUser={selectUser}
            />
          )}
          {/* Users List */}
          <UserList permissions={permissions} handleOnUpdate={handleOnUpdate} />
        </Protected>
      </section>
    </div>
  );
}
