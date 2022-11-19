import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './Base.entity';

@Entity({ name: 'permission' })
export class Permission extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'group_id', type: 'varchar' })
  groupId: string;

  @Column({ name: 'action', type: 'varchar' })
  action: string;

  @Column({ name: 'subject', type: 'varchar' })
  subject: string;

  @Column({ name: 'fields', type: 'jsonb', nullable: true })
  fields: string;

  @Column({ name: 'conditions', type: 'varchar', nullable: true })
  conditions: string;
}
