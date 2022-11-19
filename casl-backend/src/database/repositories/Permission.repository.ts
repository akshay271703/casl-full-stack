import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from 'src/auth/groups/dto/request.dto';
import { Repository, DataSource } from 'typeorm';
import { Permission } from '../entities/Permissions.entity';

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async createPermission(data: CreatePermissionDto): Promise<Permission> {
    return await this.save(this.create(data));
  }
}
