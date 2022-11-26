import { IGroupListResponse } from '../../dto/groups.dto';
import Protected from '../authentication';

export default function GroupListTable({ groupList, permissions }: any) {
  const list: IGroupListResponse[] = groupList;
  return (
    <section>
      {list.map((el) => {
        return (
          <div
            key={el.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '30% 55% 15%',
              padding: '10px',
              letterSpacing: '1px',
            }}
            className='hover-dim-bg'
          >
            <p>{el.name}</p>
            <p>{el.description}</p>
            <Protected permissions={permissions} I={'update'} a={'Groups'}>
              <p style={{ cursor: 'pointer' }}>Edit</p>
            </Protected>
          </div>
        );
      })}
    </section>
  );
}
