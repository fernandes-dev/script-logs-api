import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/entities/user/user';
import { HashPassword } from './hash-password/hash-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private hashPassword: HashPassword,
  ) {}

  private async validadeUser(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new NotAcceptableException('email/password combination error 1');

    const passwordIsValid = await this.hashPassword.checkHash(
      password,
      user.password,
    );

    if (!passwordIsValid)
      throw new NotAcceptableException('email/password combination error 2');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validadeUser(email, password);

    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
