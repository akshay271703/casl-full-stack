import { useEffect, useState } from 'react';
import DashboardSidebar from '../../component/dashboard/Sidebar';

export default function Dashboard() {
  const [permissions, setPermissions] = useState('');
  useEffect(() => {
    const p = localStorage.getItem('permissions');
    if (p) {
      setPermissions(JSON.parse(p));
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <section style={{ display: 'grid', gridTemplateColumns: '200px auto' }}>
        <aside>
          <DashboardSidebar permissions={permissions} />
        </aside>
        <section style={{ padding: '0px 10px', letterSpacing: '1px' }}>
          <p>This is a CASL demo</p>
          <p style={{ margin: '10px 0'}}>Technologies used in building the project - </p>
          <ul style={{ lineHeight: '2rem' }}>
            <li>Next Js on Frontend</li>
            <li>Nest Js on Backend</li>
            <li>Postgres as Database</li>
            <li>Next Js | Frontend</li>
            <li>Next Js | Frontend</li>
          </ul>
        </section>
      </section>
    </div>
  );
}
