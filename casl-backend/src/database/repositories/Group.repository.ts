import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from 'src/auth/groups/dto/create-group.dto';
import { Repository, DataSource } from 'typeorm';
import { Group } from '../entities/Group.entity';
import { Permission } from '../entities/Permissions.entity';

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

  async getGroupPermissions(): Promise<any> {
    const permissions = await this.createQueryBuilder('g')
      .select([
        'g.name AS name',
        'g.id as groupid',
        'p.id as id',
        'p.subject as subject',
        'p.fields as fields',
        'p.conditions as conditions',
        'p.action as action',
      ])
      .leftJoin(
        Permission,
        'p',
        'CAST(p.group_id as uuid) = CAST(g.id as uuid)'
      )
      .printSql()
      .orderBy('g.name', 'DESC')
      .getRawMany();
    const obj = {};
    permissions.forEach((el) => {
      const { groupid, name, ...rest } = el;
      if (!obj[el.groupid]) {
        obj[el.groupid] = {
          id: el.groupid,
          name: el.name,
          permissions: [{ ...rest }],
        };
      } else {
        obj[el.groupid].permissions.push(rest);
      }
    });
    return Object.values(obj);
  }
}
