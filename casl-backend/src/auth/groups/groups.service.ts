import { Injectable } from '@nestjs/common';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { GroupRepository } from 'src/database/repositories/Group.repository';
import { PermissionRepository } from 'src/database/repositories/Permission.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreatePermissionDto, DeletePermissionDto } from './dto/request.dto';
import { GroupListResponseDto } from './dto/response.dto';

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly permissionRepo: PermissionRepository
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    return await this.groupRepo.createGroup(createGroupDto);
  }

  async findAll(): Promise<GroupListResponseDto[]> {
    const result = await this.groupRepo.getGroups({});
    return plainToInstance(
      GroupListResponseDto,
      <GroupListResponseDto[]>instanceToPlain(result),
      { excludeExtraneousValues: true }
    );
  }

  async findOne(id: string) {
    return await this.groupRepo.getGroupBy({ id });
  }

  async createPermission(data: CreatePermissionDto) {
    return await this.permissionRepo.createPermission(data);
  }

  async getGroupPermissions() {
    return await this.groupRepo.getGroupPermissions();
  }

  async getSubjectList() {
    return await this.permissionRepo.getSubjectList();
  }

  async deletePermissions(data: DeletePermissionDto) {
    return await this.permissionRepo.removePermission(data);
  }
}
