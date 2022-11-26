import { Injectable } from '@nestjs/common';
import { CreateUserGroupRequestDto } from 'src/auth/users/dto/request.dto';
import { Repository, DataSource } from 'typeorm';
import { Group } from '../entities/Group.entity';
import { UserGroup } from '../entities/UserGroup.entity';

@Injectable()
export class UserGroupRepository extends Repository<UserGroup> {
  constructor(private dataSource: DataSource) {
    super(UserGroup, dataSource.createEntityManager());
  }

  async assignGroupToUser(data: CreateUserGroupRequestDto): Promise<UserGroup> {
    return await this.save(this.create(data));
  }

  async getUserGroups(userId: string): Promise<any> {
    return await this.createQueryBuilder('ug')
      .select(['g.name', 'g.id'])
      .leftJoin(Group, 'g', 'CAST(ug.group_id as uuid) = CAST(g.id as uuid)')
      .where('ug.user_id = :userId', { userId })
      .andWhere('g.id is not null')
      .printSql()
      .getRawMany();
  }
}
