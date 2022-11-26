import { Exclude, Expose } from 'class-transformer';
export class GroupListResponseDto {
  @Exclude()
  createdAt: string;

  @Expose()
  description: string;

  @Expose()
  id: string;

  @Exclude()
  lastUpdatedAt: string;
  
  @Expose()
  name: string;
}
