import { useEffect, useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import { ACTIONS, SUBJECTS } from '../../config/Constants';
import Protected from '../authentication';
import Button from '../ui/Button';

interface IUserList {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export default function UserList({ permissions, handleOnUpdate }: any) {
  const [userList, setUserList] = useState([]);

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
              unauthorized={true}
            >
              <Button
                text={'Update'}
                type={'secondary'}
                onClick={() => handleOnUpdate(el)}
                css={{
                  width: '200px',
                  height: '30px',
                  marginTop: '10px',
                }}
              />
            </Protected>
          </div>
        );
      })}
    </section>
  );
}
