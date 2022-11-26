import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserGroupRequestDto } from './dto/request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/permissions/:id')
  getPermissions(@Param('id') id: string) {
    return this.usersService.getUserPermissions(id);
  }

  @Get('/group/:userId')
  async getUserGroups(@Param('userId') userId: string) {
    return await this.usersService.getUserGroups(userId)
  }

  @Post('/group/assign')
  async assignGroupToUser(@Body() data: CreateUserGroupRequestDto) {
    return await this.usersService.assignGroupToUser(data);
  }
}
