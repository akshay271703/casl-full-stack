type TPermissionAction = 'create' | 'read' | 'update' | 'delete';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty()
  action: TPermissionAction;

  @IsNotEmpty()
  subject: string;

  fields?: any;
  condition?: any;
}
