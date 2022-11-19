import { IsString, IsNotEmpty } from 'class-validator';
export class CreateUserGroupRequestDto {
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
