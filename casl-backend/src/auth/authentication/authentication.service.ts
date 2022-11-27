import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { PermissionRepository, UserPermissionsResponse } from "src/database/repositories/Permission.repository";
import { UserRepository } from "src/database/repositories/User.repository";
import { checkHash } from "src/services/bcrypt";
import { GetUserResponseDto } from "../users/dto/response.dto";
import { LoginRequestDto } from "./dto/authentication.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository, private readonly permissionRepo: PermissionRepository) {}
  async login(request: LoginRequestDto): Promise<any> {
    const user = await this.userRepo.getUser({ email: request.email });
    if(!user) {
      throw new NotFoundException('User does not exist')
    }
    const isPasswordMatch = await checkHash(request.password, user.password)
    if(!isPasswordMatch){
      throw new ForbiddenException('Invalid password')
    }
    const results: UserPermissionsResponse[] = await this.permissionRepo.getUserPermission(user.id);
    const permissions = results.map((el) => {
      const { group, ...rest} = el;
      return rest
    })
    return {
      ...plainToInstance(GetUserResponseDto, instanceToPlain(user), { excludeExtraneousValues: true}),
      group: results[0].group,
      permissions
    }
  }
}
