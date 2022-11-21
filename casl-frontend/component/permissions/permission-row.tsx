import { useState } from 'react';
import { ApiMap } from '../../api/apiMap';
import { api, TMethod } from '../../api/useApi';
export default function PermissionRow({
  permissions,
  subject,
  groupId,
  onUpdate,
}: any) {
  const [match, setMatch] = useState(['create', 'read', 'update', 'delete']);

  function assignNewPermission(body: any) {
    const { ASSIGN } = ApiMap.PERMISSION;
    api(ASSIGN.url, ASSIGN.method as TMethod, { body }).then((res) => {
      onUpdate();
    });
  }

  function deletePermission(body: any) {
    const { REMOVE } = ApiMap.PERMISSION;
    api(REMOVE.url, REMOVE.method as TMethod, { body }).then((res) => {
      onUpdate();
    });
  }

  function handleChange(isChecked: boolean, subject: string, action: string) {
    const payload = {
      groupId,
      action,
      subject,
    };
    return isChecked ? assignNewPermission(payload) : deletePermission(payload);
  }

  return (
    <div
      style={{
        marginTop: '5px',
        width: '200px',
        display: 'flex',
        justifyContent: 'space-evenly',
      }}
    >
      {match.map((element: any, index) => {
        return (
          <span key={index}>
            <input
              type='checkbox'
              name={element.id}
              onChange={(e) =>
                handleChange(e.target.checked, subject.subject, element)
              }
              checked={permissions.find(
                (el: any) =>
                  el.action === element && el.subject === subject.subject
              )}
            />
          </span>
        );
      })}
    </div>
  );
}
