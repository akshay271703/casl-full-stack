import { useState } from 'react';
import Protected from '../authentication';
import { useRouter } from 'next/router';

export default function DashboardSidebar({ permissions }: any) {
  const router = useRouter();
  const [listData, setListData] = useState([
    {
      id: 1,
      label: 'Dashboard',
      url: '/dashboard',
    },
    {
      id: 2,
      label: 'Groups',
      url: '/groups',
    },
    {
      id: 3,
      label: 'Permissions',
      url: '/permissions',
    },
    {
      id: 4,
      label: 'Users',
      url: '/users',
    },
  ]);

  function handleRedirect(url: string) {
    router.push(url);
  }

  return (
    <div style={{ borderRight: '2px solid #eee' }}>
      {listData.map((el) => {
        return (
          <Protected key={el.id} permissions={permissions} a={el.label}>
            <div
              style={{
                padding: '5px 0 5px 10px',
                marginBottom: '10px',
                cursor: 'pointer',
                borderLeft: '2px solid #eee',
              }}
              onClick={() => handleRedirect(el.url)}
            >
              {el.label}
            </div>
          </Protected>
        );
      })}
    </div>
  );
}
