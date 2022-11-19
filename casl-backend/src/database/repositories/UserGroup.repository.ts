import { Injectable } from '@nestjs/common';
import { CreateUserGroupRequestDto } from 'src/auth/users/dto/request.dto';
import { Repository, DataSource } from 'typeorm';
import { UserGroup } from '../entities/UserGroup.entity';

@Injectable()
export class UserGroupRepository extends Repository<UserGroup> {
  constructor(private dataSource: DataSource) {
    super(UserGroup, dataSource.createEntityManager());
  }

  async assignGroupToUser(data: CreateUserGroupRequestDto): Promise<UserGroup> {
    return await this.save(this.create(data));
  }
}
