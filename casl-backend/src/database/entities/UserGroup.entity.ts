import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Base } from './Base.entity';

@Entity({ name: 'user_group' })
@Unique(["groupId", "userId"])
export class UserGroup extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'group_id', type: 'varchar' })
  groupId: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;
}
