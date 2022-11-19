import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './Base.entity';

@Entity({ name: 'user' })
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: '30' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '30' })
  lastName: string;

  @Column({ name: 'email', unique: true, type: 'varchar', length: '50' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
