import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) { }

  async insertUser(userData: User) {
    const newUser: User = new this.userModel(
      userData,
    );
    const result = await newUser.save();
    return result;
  }

  async getUsers(params: object) {
    const users = await this.userModel.find(params).exec();
    return users;
  }

  async getSingleUser(userId: string) {
    const user: User = await this.findUser(userId);
    return user;
  }

  async updateUser(userId: string, userData: User) {
    const updatedUser: User = await this.findUser(
      userId,
    );
    updatedUser.set(userData);
    const result = updatedUser.save();
    return result;
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
