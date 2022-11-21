import { useEffect, useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import { ACTIONS, SUBJECTS } from '../../config/Constants';
import Protected from '../authentication';
import Chip from '../ui/Chip';
import Modal from '../ui/modals/Modal';

interface IUserRoles {
  g_name: string;
  g_id: string;
}

export default function UpdateUserModal({ permissions, selectUser }: any) {
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([])
  const [testGroups, setTestGroups] = useState(['Super Admin']);

  function fetchAllGroups() {
    const { GET_LIST } = ApiMap.GROUP;
    api(GET_LIST.url, GET_LIST.method as TMethod).then((res) =>
      setGroups(res.data)
    );
  }

  function fetchUserGroups() {
    const  {GET_GROUPS} = ApiMap.USER;
    api(`${GET_GROUPS.url}/${selectUser.userId}`, GET_GROUPS.method as TMethod)
    .then(res => setUserGroups(res.data.map((el: IUserRoles) => el.g_name)))
  }


  useEffect(() => {
    fetchAllGroups();
    fetchUserGroups();
  }, []);

  return (
    <Protected a={SUBJECTS.USERS} permissions={permissions} I={ACTIONS.UPDATE}>
      <Modal>
        <section
          style={{
            width: '400px',
            background: '#eee',
            color: '#222',
            textAlign: 'left',
          }}
        >
          <p style={{ fontWeight: 300, fontSize: '2rem' }}>
            Update User Details
          </p>
          <input
            type='text'
            name='name'
            placeholder={selectUser.name}
            disabled
          />
          <input
            type='text'
            name='user-id'
            placeholder={selectUser.userId}
            disabled
          />
          <section>
            <p>Group Member</p>
            {groups
              .filter((el: any) => userGroups.includes(el.name as never))
              .map((group: any) => {
                return <Chip name={group.name} key={group.id} />;
              })}
          </section>
          <section>
            <p>Add to groups</p>
            {groups
              .filter((el: any) => !userGroups.includes(el.name as never))
              .map((group: any) => {
                return <Chip name={group.name} key={group.id} />;
              })}
          </section>
        </section>
      </Modal>
    </Protected>
  );
}
