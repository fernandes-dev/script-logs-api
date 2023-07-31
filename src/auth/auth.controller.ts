import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface IRequest {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() { email, password }: IRequest) {
    return this.authService.login(email, password);
  }
}
