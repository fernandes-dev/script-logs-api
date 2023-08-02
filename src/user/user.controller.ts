import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto/user.dto';
import { User } from './entities/user/user';
import { HashPassword } from '../auth/hash-password/hash-password';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

interface IUserProfile {
  name: string;
  email: string;
}

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private hashPassword: HashPassword,
  ) {}

  @Post('/')
  async create(@Body() user: UserDto): Promise<User> {
    const emailExists = await this.userService.findByEmail(user.email);

    if (emailExists)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Email already exists',
        },
        HttpStatus.UNAUTHORIZED,
      );

    const hashedPassword = await this.hashPassword.makeHash(user.password);

    return this.userService.create({
      ...user,
      password: hashedPassword,
    } as UserDto);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Req() request: Request): Promise<IUserProfile> {
    const { email } = request.user as User;

    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new HttpException(
        { message: 'User not found', status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );

    return { name: user.name, email: user.email };
  }
}
