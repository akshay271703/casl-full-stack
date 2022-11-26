import { useEffect, useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import { ACTIONS, SUBJECTS } from '../../config/Constants';
import Protected from '../authentication';
import Button from '../ui/Button';
import Modal from '../ui/modals/Modal';

interface IUserRoles {
  g_name: string;
  g_id: string;
}

interface IGroupResponse {
  description: string;
  id: string;
  name: string;
}

export default function UpdateUserModal({
  permissions,
  selectUser,
  closeModal,
}: any) {
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('Unassigned');

  function assignUserGroup() {
    const { ASSIGN_GROUP } = ApiMap.USER;
    try {
      api(ASSIGN_GROUP.url, ASSIGN_GROUP.method as TMethod, {
        body: {
          userId: selectUser.userId,
          groupId: selectedGroup,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function fetchAllGroups() {
    const { GET_LIST } = ApiMap.GROUP;
    api(GET_LIST.url, GET_LIST.method as TMethod).then((res) =>
      setGroups(res.data)
    );
  }

  function fetchUserGroups() {
    const { GET_GROUPS } = ApiMap.USER;
    api(
      `${GET_GROUPS.url}/${selectUser.userId}`,
      GET_GROUPS.method as TMethod
    ).then((res) => setUserGroups(res.data.map((el: IUserRoles) => el.g_name)));
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
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <section
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 0 20px 0',
            }}
          >
            <p
              style={{
                fontWeight: 300,
                fontSize: '2rem',
                margin: '0',
              }}
            >
              Update User Details
            </p>
            <h1
              style={{ cursor: 'pointer', marginRight: '20px' }}
              onClick={closeModal}
            >
              X
            </h1>
          </section>
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
          <select
            style={{
              width: '100%',
              padding: '8px',
              background: '#fff',
              color: '#222',
              borderRadius: '10px',
              border: 'none',
              letterSpacing: '1px',
            }}
            onChange={(evt) => setSelectedGroup(evt.target.value)}
          >
            <option value='null'>Unassigned</option>
            {groups.map((el: IGroupResponse, index) => {
              return (
                <option value={el.id} key={el.id} selected={ el.id === selectUser.groupId}>
                  {el.name}
                </option>
              );
            })}
          </select>

          <Button
            text={'Save'}
            type={'secondary'}
            css={{ marginTop: '20px', padding: '8px 20px' }}
            onClick={assignUserGroup}
          />
        </section>
      </Modal>
    </Protected>
  );
}
