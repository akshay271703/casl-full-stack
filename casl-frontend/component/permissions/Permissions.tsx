import { useState } from 'react';
import { IPermissionList } from '../../dto/permissons.dto';
import Protected from '../authentication';
import Table2080 from '../ui/table-model';
import PermissionRow from './permission-row';

export default function PermissionsData({ permissions, subjects, userPermissions }: any) {
  const [updateCount, setUpdateCount] = useState(0);
  console.log(permissions);
  return (
    <section>
      {permissions.map((el: IPermissionList, index: number) => {
        return (
          <Table2080 key={index}>
            <p>{el.name}</p>
              <section style={{ display: 'flex' }}>
                {subjects.map((ele: string, ind: number) => {
                  return (
                    <section key={ind}>
                      <PermissionRow
                        permissions={el.permissions}
                        subject={ele}
                        groupId={el.id}
                        userPermissions={userPermissions}
                        onUpdate={() => setUpdateCount((prev) => prev + 1)}
                      />
                    </section>
                  );
                })}
              </section>
          </Table2080>
        );
      })}
    </section>
  );
}
