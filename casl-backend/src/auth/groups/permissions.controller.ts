import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreatePermissionDto, DeletePermissionDto } from './dto/request.dto';

@Controller('/auth/permissions')
export class PermissionController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('')
  async getGroupPermissions() {
    return await this.groupsService.getGroupPermissions();
  }

  @Get('/subjects')
  async getSubjectList() {
    return await this.groupsService.getSubjectList();
  }

  @Post('')
  async assignPermission(@Body() data: CreatePermissionDto) {
    return await this.groupsService.createPermission(data);
  }

  @Patch('')
  async deletePermission(@Body() data: DeletePermissionDto) {
    return await this.groupsService.deletePermissions(data);
  }
}
