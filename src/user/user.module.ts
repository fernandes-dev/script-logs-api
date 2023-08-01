import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntity } from './entities/user/user';
import { HashPassword } from '../auth/hash-password/hash-password';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
  ],
  controllers: [UserController],

  providers: [UserService, HashPassword, JwtService],
})
export class UserModule {}
