import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
import Protected from '../../component/authentication';
import AddGroupModal from '../../component/groups/AddGroupModal';
import GroupListTable from '../../component/groups/GroupList';
import Button from '../../component/ui/Button';
import { BoxCenterV } from '../../component/ui/Box';
import { IGroupListResponse } from '../../dto/groups.dto';

export default function Groups() {
  const router = useRouter();
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const p = localStorage.getItem('permissions');
    if (p) {
      setPermissions(JSON.parse(p));
    } else {
      router.push('/');
    }
  }, []);

  const [groups, setGroups] = useState<IGroupListResponse[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const { GET_LIST } = ApiMap.GROUP;
    api(GET_LIST.url, GET_LIST.method as TMethod).then((result) => {
      const data: IGroupListResponse[] = result.data;
      setGroups(data);
    });
  }, []);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div style={{ padding: '40px' }}>
      <Head>
        <title>CASL Groups</title>
        <meta name='description' content='Manage groups on this page' />
      </Head>
      <Protected a={'Groups'} permissions={permissions} unauthorized={true}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <section>
            <h1 style={{ fontWeight: '300' }}>Application Groups</h1>
          </section>
          <BoxCenterV>
            <Protected a={'Groups'} I='create' permissions={permissions}>
              <Button
                text={'Add Group'}
                type={'secondary'}
                onClick={() => setShowModal(!showModal)}
              />
            </Protected>
          </BoxCenterV>
        </div>

        {groups.length === 0 ? <p>No Groups Found</p> : undefined}
        <GroupListTable groupList={groups} permissions={permissions} />
        {showModal && <AddGroupModal closeModal={closeModal} />}
      </Protected>
    </div>
  );
}
