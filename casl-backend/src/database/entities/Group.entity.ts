import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './Base.entity';

@Entity({ name: 'group' })
export class Group extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;
}
