import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from 'src/auth/groups/dto/create-group.dto';
import { Repository, DataSource } from 'typeorm';
import { Group } from '../entities/Group.entity';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(private dataSource: DataSource) {
    super(Group, dataSource.createEntityManager());
  }

  async createGroup(data: CreateGroupDto): Promise<Group> {
    return await this.save(this.create(data));
  }

  async getGroups(where: any = {}): Promise<Group[]> {
    return await this.findBy(where);
  }

  async getGroupBy(where: any = {}): Promise<Group> {
    return await this.findOneBy(where);
  }
}
