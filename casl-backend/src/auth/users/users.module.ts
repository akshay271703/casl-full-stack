import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/database/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repositories/User.repository';
import { UserGroup } from 'src/database/entities/UserGroup.entity';
import { UserGroupRepository } from 'src/database/repositories/UserGroup.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserGroup])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserGroupRepository],
})
export class UsersModule {}
