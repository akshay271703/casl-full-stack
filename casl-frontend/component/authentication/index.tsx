import { MongoAbility } from '@casl/ability';
import { createCanInstance } from '../../config/Can';
import Unauthorized from './unauthorized';

export default function Protected({
  children,
  permissions,
  I,
  a,
  unauthorized,
}: any) {
  const ability = createCanInstance(permissions) as MongoAbility;
  return (
    <div>
      <div>{ability.can(I || 'read', a) && children}</div>
      <div>
        {!ability.can(I || 'read', a) && unauthorized && <Unauthorized />}
      </div>
    </div>
  );
}
