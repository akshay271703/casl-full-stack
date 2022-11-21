import Head from 'next/head';
import { useState, useEffect } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api } from '../../api/useApi';
import { TMethod } from '../../api/useApi';
import PermissionRow from '../../component/permissions/permission-row';
import SubjectsHeaders from '../../component/subject/subjects';
import { BoxCenterV } from '../../component/ui/layouts/Box';
import Table2080 from '../../component/ui/table-model';

interface IPermission {
  action: string;
  conditions: string;
  fields: string;
  id: string;
  subject: string;
}

export interface IPermissionList {
  name: string;
  id: string;
  permissions: IPermission[];
}

export default function Permissions() {
  const [permissions, setPermissions] = useState<IPermissionList[]>([]);
  const [subjects, setSubjects] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
  useEffect(() => {
    try {
      const { GET_LIST, SUBJECT_LIST } = ApiMap.PERMISSION;
      api(GET_LIST.url, GET_LIST.method as TMethod).then((result) => {
        const apiResponse = result.data as IPermissionList[];
        setPermissions(apiResponse);
      });
      api(SUBJECT_LIST.url, SUBJECT_LIST.method as TMethod).then((result) => {
        setSubjects(result.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [updateCount]);

  return (
    <div style={{ padding: '10px' }}>
      <Head>
        <title>CASL Permissions</title>
        <meta name='description' content='Permission page' />
      </Head>
      <Table2080>
        <BoxCenterV>
          <p>Roles</p>
        </BoxCenterV>
        <section className='list-auth'>
          <div style={{ display: 'flex' }}>
            {subjects?.map((el: IPermission, index: number) => {
              return <SubjectsHeaders key={index} subjects={el.subject} />;
            })}
          </div>
        </section>
      </Table2080>
      {permissions.map((el: IPermissionList, index) => {
        return (
          <Table2080 key={index}>
            <p>{el.name}</p>
            <section style={{ display: 'flex' }}>
              {subjects.map((ele, index) => {
                return (
                  <section key={index}>
                    <PermissionRow
                      permissions={el.permissions}
                      subject={ele}
                      groupId ={el.id}
                      onUpdate = {() => setUpdateCount((prev) => prev+1)}
                    />
                  </section>
                );
              })}
            </section>
          </Table2080>
        );
      })}
    </div>
  );
}
