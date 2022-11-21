import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ApiMap } from '../api/apiMap';
import { api, TMethod } from '../api/useApi';
import Protected from '../component/authentication';
import { IPermissionList } from './permissions';

export default function Home() {
  const [permissions, setPermissions] = useState<IPermissionList[]>([]);
  const [actions, setData] = useState(['create', 'read', 'update', 'delete']);
  const [subjects, setSubjects] = useState([
    'Branch',
    'Company',
    'Tenants',
    'Users',
  ]);

  useEffect(() => {
    try {
      const { GET_LIST } = ApiMap.PERMISSION;
      api(GET_LIST.url, GET_LIST.method as TMethod).then((result) => {
        const apiResponse = result.data as IPermissionList[];
        setPermissions(apiResponse);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>CASL Demo</title>
        <meta name='description' content='Next.Js Implementation for CASL' />
      </Head>
      <Protected a={'Branch'} permissions={permissions}>
        <h1>Branch</h1>
        <button>Testing</button>
      </Protected>
    </div>
  );
}
