import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/users/dto/create-user.dto';
import { Repository, DataSource } from 'typeorm';
import { Group } from '../entities/Group.entity';
import { Permission } from '../entities/Permissions.entity';
import { User } from '../entities/User.entity';
import { UserGroup } from '../entities/UserGroup.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.save(this.create(data));
  }

  async getUsers(where: any = {}): Promise<User[]> {
    return await this.findBy(where);
  }

  async getUser(where: any = {}): Promise<User> {
    return await this.findOneBy(where);
  }

  async getUserPermissions(userId: string): Promise<any> {
    return await this.createQueryBuilder('user')
      .select(['p.action as action', 'p.subject as subject', 'p.conditions as condition', 'p.fields as fields'])
      .leftJoin(UserGroup, 'ug', 'CAST(ug.user_id as uuid) = CAST(user.id as uuid)')
      .leftJoin(Group, 'g', 'CAST(g.id as uuid) = CAST(ug.group_id as uuid)')
      .leftJoin(Permission, 'p', 'CAST(p.group_id as uuid) = CAST(g.id as uuid)')
      .where('user.id = :userId', { userId })
      .printSql()
      .getRawMany();
  }
}
