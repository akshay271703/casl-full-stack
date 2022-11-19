import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/User.repository';
import { UserGroupRepository } from 'src/database/repositories/UserGroup.repository';
import { encrypt } from 'src/services/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserGroupRequestDto } from './dto/request.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository, private readonly userGroupRepo: UserGroupRepository) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await encrypt(createUserDto.password);
    return await this.userRepo.createUser(createUserDto);
  }

  async findAll() {
    return await this.userRepo.getUsers();
  }

  async findOne(id: string) {
    return await this.userRepo.getUser({ id });
  }

  async assignGroupToUser(data: CreateUserGroupRequestDto) {
    return await this.userGroupRepo.assignGroupToUser(data);
  }

  async getUserPermissions(userId: string) {
    return await this.userRepo.getUserPermissions(userId);
  }
}
