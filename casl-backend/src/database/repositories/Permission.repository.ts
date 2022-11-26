import { Injectable } from '@nestjs/common';
import {
  CreatePermissionDto,
  DeletePermissionDto,
} from 'src/auth/groups/dto/request.dto';
import { Repository, DataSource } from 'typeorm';
import { Group } from '../entities/Group.entity';
import { Permission } from '../entities/Permissions.entity';
import { UserGroup } from '../entities/UserGroup.entity';

export class UserPermissionsResponse {
  group: string;
  action: string;
  subject: string;
  fields: string;
  conditions: string;
}

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async getUserPermission(userId: string): Promise<UserPermissionsResponse[]> {
    return await this.createQueryBuilder('p')
      .select([
        'g.name as group',
        'p.action as action',
        'p.subject as subject',
        'p.fields as fields',
        'p.conditions as conditions',
      ])
      .innerJoin(
        UserGroup,
        'ug',
        'CAST(ug.group_id as uuid) = CAST(p.group_id as uuid)'
      )
      .innerJoin(Group, 'g', 'CAST(g.id as uuid) = CAST(ug.group_id as uuid)')
      .where('ug.user_id = :userId', { userId })
      .getRawMany();
  }

  async createPermission(data: CreatePermissionDto): Promise<Permission> {
    return await this.save(this.create(data));
  }

  async getSubjectList(): Promise<any> {
    return await this.createQueryBuilder('p')
      .select(['p.subject'])
      .distinctOn(['p.subject'])
      .getMany();
  }

  async removePermission(data: DeletePermissionDto): Promise<any> {
    return await this.delete(data);
  }
}
