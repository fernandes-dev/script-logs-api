import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto/user.dto';
import { User, UserDocument } from './entities/user/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: UserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(user);

    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
