import { Injectable } from '@nestjs/common';
import { GroupRepository } from 'src/database/repositories/Group.repository';
import { PermissionRepository } from 'src/database/repositories/Permission.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreatePermissionDto } from './dto/request.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly groupRepo: GroupRepository, private readonly permissionRepo: PermissionRepository) {}
  async create(createGroupDto: CreateGroupDto) {
    return await this.groupRepo.createGroup(createGroupDto);
  }

  async findAll() {
    return await this.groupRepo.getGroups({});
  }

  async findOne(id: string) {
    return await this.groupRepo.getGroupBy({ id });
  }

  async createPermission(data: CreatePermissionDto) {
    return await this.permissionRepo.createPermission(data);
  }
}
