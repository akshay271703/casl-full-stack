import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ApiMap } from '../api/apiMap';
import { api, TMethod } from '../api/useApi';
import Protected from '../component/authentication';
import { IPermissionList } from './permissions';

export default function Home() {
  const [permissions, setPermissions] = useState<IPermissionList[]>([]);
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
        <title>Branch</title>
        <meta name='description' content='Next.Js Implementation for CASL' />
      </Head>
      <section style={{ textAlign: 'center' }}>
        <Protected a={'Branch'} permissions={permissions} unauthorized={true}>
          <h1>Branch</h1>
          <Protected
            a={'Branch'}
            permissions={permissions}
            unauthorized={false}
          >
            <h1>Branch</h1>
          </Protected>
        </Protected>
      </section>
    </div>
  );
}
