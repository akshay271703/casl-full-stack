import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import Button from '../../component/ui/Button';
import { BoxCenterH, BoxCenterV } from '../../component/ui/layouts/Box';
import Modal from '../../component/ui/modals/Modal';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  function handleOnSubmit() {
    const { CREATE } = ApiMap.GROUP;
    api(CREATE.url, CREATE.method as TMethod, {
      body: {
        name: groupName,
        description: groupDescription,
      },
    }).then((result) => {
      console.log(result);
    });
    setShowModal(false);
  }

  useEffect(() => {
    const { GET_LIST } = ApiMap.GROUP;
    api(GET_LIST.url, GET_LIST.method as TMethod).then((result) =>
      setGroups(result.data)
    );
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <Head>
        <title>CASL Groups</title>
        <meta name='description' content='Manage groups on this page' />
      </Head>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <section>
          <h1 style={{ fontWeight: '300' }}>Groups</h1>
        </section>
        <BoxCenterV>
          <Button
            text={'Add Group'}
            type={'primary'}
            onClick={() => setShowModal(!showModal)}
          />
        </BoxCenterV>
      </div>

      {groups.length === 0 ? <p>No Groups Found</p> : undefined}
      {groups.map((el: any, index) => {
        return <p key={index}> {el.id} | {el.name} </p>;
      })}
      {showModal && (
        <Modal>
          <div style={{ width: '400px' }}>
            <p>Add New Group</p>
            <input
              type='text'
              placeholder='Enter group name'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
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
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              style={{
                border: 'none',
                background: '#fff',
                color: '#111',
                padding: '8px 20px',
                width: '100%',
                margin: '20px 0',
                borderRadius: '10px',
              }}
            />
            <BoxCenterH>
              <Button text='Submit' type={'dark'} onClick={handleOnSubmit} />
            </BoxCenterH>
          </div>
        </Modal>
      )}
    </div>
  );
}
