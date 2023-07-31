import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto/user.dto';
import { User } from './entities/user/user';
import { HashPassword } from '../auth/hash-password/hash-password';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private hashPassword: HashPassword,
  ) {}

  @Post('/')
  async create(@Body() user: UserDto): Promise<User> {
    const hashedPassword = await this.hashPassword.makeHash(user.password);

    return this.userService.create({
      ...user,
      password: hashedPassword,
    } as UserDto);
  }

  @Get('/')
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
