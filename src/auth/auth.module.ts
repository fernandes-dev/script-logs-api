import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntity } from '../user/entities/user/user';
import { HashPassword } from './hash-password/hash-password';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRES_MINUTES ?? 1) * 1000 * 60,
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
  ],
  providers: [UserService, AuthService, HashPassword],
  controllers: [AuthController],
})
export class AuthModule {}
