import Head from 'next/head';
import { useState, useEffect } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api } from '../../api/useApi';
import { TMethod } from '../../api/useApi';
import { BoxCenterV } from '../../component/ui/Box';
import { IGroupInfo, IPermissionList } from '../../dto/permissons.dto';
import Button from '../../component/ui/Button';
import Protected from '../../component/authentication';
import Table2080 from '../../component/ui/table-model';
import PermissionHeader from '../../component/permissions/Header';
import PermissionsData from '../../component/permissions/Permissions';
import CreatePermissions from '../../component/permissions/CreatePermission';

export default function Permissions() {
  const [permissions, setPermissions] = useState<IPermissionList[]>([]);
  const [subjects, setSubjects] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userGroups, setUserGroups] = useState<IGroupInfo[]>([]);

  useEffect(() => {
    try {
      const p = localStorage.getItem('permissions');
      if (p) {
        setUserPermissions(JSON.parse(p));
      }

      const { GET_LIST, SUBJECT_LIST } = ApiMap.PERMISSION;
      api(GET_LIST.url, GET_LIST.method as TMethod).then((result) => {
        const apiResponse = result.data as IPermissionList[];
        setPermissions(apiResponse);
        const groupsInfo = apiResponse.map(el => {
          return {
            name: el.name,
            id: el.id
          }
        })
        setUserGroups(groupsInfo);
      });
      api(SUBJECT_LIST.url, SUBJECT_LIST.method as TMethod).then((result) => {
        setSubjects(result.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <Head>
        <title>CASL Permissions</title>
        <meta name='description' content='Permission page' />
      </Head>
      <Protected a={'Permissions'} permissions={userPermissions}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 10px',
          }}
        >
          <section>
            <h1 style={{ fontWeight: '300' }}>Application Permissions</h1>
          </section>
          <BoxCenterV>
            <Protected
              a={'Permissions'}
              I='create'
              permissions={userPermissions}
            >
              <Button
                text={'Create Permission'}
                type={'secondary'}
                onClick={() => setShowAddModal(!showAddModal)}
              />
            </Protected>
          </BoxCenterV>
        </div>
        <Table2080>
          <BoxCenterV>
            <p style={{ fontSize: '30px' }}>Roles</p>
          </BoxCenterV>
          <section className='list-auth'>
            <PermissionHeader subjects={subjects} />
          </section>
        </Table2080>
        <PermissionsData subjects={subjects} permissions={permissions} userPermissions={userPermissions} />
        {showAddModal && (
          <CreatePermissions groups={userGroups} closeModal={() => setShowAddModal(false)} />
        )}
      </Protected>
    </div>
  );
}
