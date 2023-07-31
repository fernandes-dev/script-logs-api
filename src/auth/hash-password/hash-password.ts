import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as process from 'process';

@Injectable()
export class HashPassword {
  async makeHash(password: string): Promise<string> {
    return bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS ?? 10));
  }

  async checkHash(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
