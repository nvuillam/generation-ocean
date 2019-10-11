import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from '../users/user.model';
import { AuthService } from './auth.service';
import { LoginAuthDTO } from './auth.model';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ title: 'User authentication' })
  @ApiResponse({
    status: 200,
    type: UserDTO,
    description: 'The user has been successfully logged',
  })
  async login(@Body() loginAuthDTO: LoginAuthDTO) {
    return this.authService.login(loginAuthDTO);
  }
}
