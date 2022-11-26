import { Exclude, Expose, Transform } from "class-transformer";

export class GetUserResponseDto {
  @Exclude()
  createdAt: string;

  @Exclude()
  lastUpdatedAt: string;

  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.firstName || obj.firstname)
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.lastName || obj.lastname)
  lastName: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;
  
  @Exclude()
  isActive: string;

  @Expose()
  @Transform(({ obj }) => obj.groupId || obj.groupid)
  groupId: string;
}