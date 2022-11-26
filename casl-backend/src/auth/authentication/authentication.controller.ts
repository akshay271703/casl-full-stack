import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { LoginRequestDto } from './dto/authentication.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async create(@Body() request: LoginRequestDto) {
    return await this.authService.login(request);
  }
}
