import { MongoAbility } from '@casl/ability';
import { CASLAbility, createCanInstance } from '../../config/Can';
import Unauthorized from './unauthorized';

export default function Protected({ children, permissions, I, a, unauthorized }: any) {
  const p: CASLAbility[] = [];
  permissions.map((el: any) => {
    p.push(...el.permissions);
  });
  const ability = createCanInstance(p) as MongoAbility;
  return (
    <div>
      <div>{ability.can(I || 'read', a) && children}</div>
      <div>
        {!ability.can(I || 'read', a) && unauthorized && <Unauthorized/>}
      </div>
    </div>
  );
}
