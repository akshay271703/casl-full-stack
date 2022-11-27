import { useEffect, useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import { ACTIONS, SUBJECTS } from '../../config/Constants';
import { IUserList } from '../../dto/users.dto';
import Protected from '../authentication';
import Button from '../ui/Button';
import UpdateUserModal from './UpdateUserModal';

export default function UserList({ permissions }: any) {
  const [userList, setUserList] = useState([]);

  const [selectUser, setSelectedUser] = useState({ userId: '', name: '', groupId: '' });
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  function handleOnUpdate(el: IUserList) {
    setSelectedUser({
      name: `${el.firstName} ${el.lastName}`,
      userId: el.id,
      groupId: el.groupId
    });
    setShowUpdateModal(!showUpdateModal);
  }

  function getUserList() {
    const { LIST } = ApiMap.USER;
    api(LIST.url, LIST.method as TMethod).then((res) => setUserList(res.data));
  }

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <section style={{ padding: '20px', marginTop: '20px' }}>
      {userList.map((el: IUserList) => {
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '25% 25% 25% 25%',
              marginBottom: '10px',
            }}
            key={el.id}
          >
            <p>{el.firstName}</p>
            <p>{el.lastName}</p>
            <p>{el.email}</p>
            <Protected
              a={SUBJECTS.USERS}
              I={ACTIONS.UPDATE}
              permissions={permissions} 
            >
              <Button
                text={'Update'}
                type={'secondary'}
                onClick={() => handleOnUpdate(el)}
                css={{
                  width: '200px',
                }}
              />
            </Protected>
          </div>
        );
      })}

      {showUpdateModal && (
        <UpdateUserModal
          permissions={permissions}
          selectUser={selectUser}
          closeModal={() => setShowUpdateModal(false)}
        />
      )}
    </section>
  );
}
