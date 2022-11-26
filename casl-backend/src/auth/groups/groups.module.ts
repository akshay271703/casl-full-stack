import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupRepository } from 'src/database/repositories/Group.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/database/entities/Group.entity';
import { Permission } from 'src/database/entities/Permissions.entity';
import { PermissionRepository } from 'src/database/repositories/Permission.repository';
import { PermissionController } from './permissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Permission])],
  controllers: [GroupsController, PermissionController],
  providers: [GroupsService, GroupRepository, PermissionRepository],
})
export class GroupsModule {}
