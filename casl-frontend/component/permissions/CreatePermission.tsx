import { useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import { ACTIONS } from '../../config/Constants';
import { IGroupInfo } from '../../dto/permissons.dto';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export default function CreatePermissions({ closeModal, groups }: any) {
  const [formData, setFormData] = useState({
    groupId: '',
    action: 'read',
    subject: '',
  });

  function handleOnChange(evt: any) {
    setFormData((prev) => {
      return {
        ...Object.assign(prev, { [evt.target.name]: evt.target.value }),
      };
    });
  }

  function createNewPermission() {
    const { ASSIGN } = ApiMap.PERMISSION;
    api(ASSIGN.url, ASSIGN.method as TMethod, { body: formData }).then((res) => {
      closeModal();
    });
  }

  return (
    <Modal>
      <section
        style={{
          width: '400px',
          background: '#eee',
          color: '#222',
        }}
      >
        <section
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ fontWeight: 300, fontSize: '2rem', margin: '0' }}>
            Create new Permission
          </p>
          <h1
            style={{ cursor: 'pointer', marginRight: '20px' }}
            onClick={closeModal}
          >
            X
          </h1>
        </section>
        <p style={{ margin: '0 0 5px 5px' }}>Subject</p>
        <input
          type='text'
          name='subject'
          value={formData.subject}
          onChange={handleOnChange}
        />

        <p style={{ margin: '0 0 5px 5px' }}>Action</p>
        <select
          name='action'
          onChange={handleOnChange}
          style={{
            width: '100%',
            padding: '8px',
            background: '#fff',
            color: '#222',
            borderRadius: '10px',
            border: 'none',
            letterSpacing: '1px',
            marginBottom: '20px',
          }}
        >
          <option value=''>NULL</option>
          {Object.values(ACTIONS).map((el: string, ind) => {
            return (
              <option key={ind} value={el}>
                {el.toUpperCase()}
              </option>
            );
          })}
        </select>
        <p style={{ margin: '0 0 5px 5px' }}>Group</p>

        <select
          name='groupId'
          onChange={handleOnChange}
          style={{
            width: '100%',
            padding: '8px',
            background: '#fff',
            color: '#222',
            borderRadius: '10px',
            border: 'none',
            letterSpacing: '1px',
          }}
        >
          {groups.map((el: IGroupInfo) => {
            return (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            );
          })}
        </select>
      </section>
      <Button
        text={'Add'}
        onClick={createNewPermission}
        type={'secondary'}
        css={{ width: '100%', padding: '8px', marginTop: '20px' }}
      />
    </Modal>
  );
}
