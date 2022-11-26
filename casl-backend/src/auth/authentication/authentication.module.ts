import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "src/database/entities/Permissions.entity";
import { User } from "src/database/entities/User.entity";
import { PermissionRepository } from "src/database/repositories/Permission.repository";
import { UserRepository } from "src/database/repositories/User.repository";
import { AuthController } from "./authentication.controller";
import { AuthService } from "./authentication.service";

@Module({
  imports: [TypeOrmModule.forFeature([Permission, User])],
  controllers: [AuthController],
  providers: [PermissionRepository, UserRepository, AuthService],
})
export class AuthenticationModule {}
