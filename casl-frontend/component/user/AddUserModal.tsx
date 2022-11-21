import { useState } from "react";
import { ApiMap } from "../../api/apiMap";
import { api, TMethod } from "../../api/useApi";
import Button from "../ui/Button";
import Modal from "../ui/modals/Modal";

export default function AddUserModal() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  function handleOnChange(evt: any) {
    setFormData((prev) => {
      return {
        ...Object.assign(prev, { [evt.target.name]: evt.target.value }),
      };
    });
  }

  function createNewUser() {
    const { CREATE } = ApiMap.USER;
    api(CREATE.url, CREATE.method as TMethod, { body: formData }).then(
      (res) => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
      }
    );
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
        <p style={{ fontWeight: 300, fontSize: '2rem' }}>Add New User</p>
        <input
          type='text'
          placeholder='First name'
          name='firstName'
          value={formData.firstName}
          onChange={handleOnChange}
        />
        <input
          type='text'
          placeholder='Last name'
          name='lastName'
          value={formData.lastName}
          onChange={handleOnChange}
        />
        <input
          type='text'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleOnChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleOnChange}
        />
      </section>
      <section style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button text={'Add'} onClick={createNewUser} type={'primary'} />
      </section>
    </Modal>
  );
}
