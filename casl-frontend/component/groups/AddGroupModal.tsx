import { useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import Button from '../ui/Button';
import { BoxCenterH } from '../ui/Box';
import Modal from '../ui/Modal';

export default function AddGroupModal({ permissions, closeModal }: any) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  function handleOnChange(evt: any) {
    setFormData((prev) => {
      return {
        ...Object.assign(prev, { [evt.target.name]: evt.target.value }),
      };
    });
  }

  function handleOnSubmit() {
    const { CREATE } = ApiMap.GROUP;
    api(CREATE.url, CREATE.method as TMethod, {
      body: formData,
    }).then((result) => {
      console.log(result);
    });
    closeModal();
  }

  return (
    <Modal>
      <div style={{ width: '400px' }}>
        <section
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#222',
            marginBottom: '10px',
            padding: '8px',
          }}
        >
          <p>Add New Group</p>
          <p
            style={{ fontWeight: '800', cursor: 'pointer' }}
            onClick={closeModal}
          >
            X
          </p>
        </section>
        <input
          type='text'
          placeholder='Enter group name'
          name='name'
          value={formData.name}
          onChange={handleOnChange}
          style={{
            background: '#fff',
            color: '#111',
            border: 'none',
            padding: '8px 20px',
            width: '100%',
            borderRadius: '10px',
          }}
        />
        <input
          type='text'
          placeholder='Enter group description'
          name='description'
          value={formData.description}
          onChange={handleOnChange}
          style={{
            border: 'none',
            background: '#fff',
            color: '#111',
            padding: '8px 20px',
            width: '100%',
            margin: '10px 0',
            borderRadius: '10px',
          }}
        />
        <BoxCenterH>
          <Button text='Submit' type={'dark'} onClick={handleOnSubmit} />
        </BoxCenterH>
      </div>
    </Modal>
  );
}
