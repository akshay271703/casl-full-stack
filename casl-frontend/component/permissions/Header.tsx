import { IPermission } from '../../dto/permissons.dto';
import SubjectsHeaders from '../subject/subjects';

export default function PermissionHeader({ subjects }: any) {
  return (
    <div style={{ display: 'flex' }}>
      {subjects?.map((el: IPermission, index: number) => {
        return <SubjectsHeaders key={index} subjects={el.subject} />;
      })}
    </div>
  );
}
