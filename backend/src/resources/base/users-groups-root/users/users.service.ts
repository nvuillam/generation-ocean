import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private bCryptSaltRounds = 15;

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  // Create a new user
  async insertUser(userData: User) {
    if (userData.password) {
      // hash password
      userData.password = await bcrypt.hash(
        userData.password,
        this.bCryptSaltRounds,
      );
    }
    const newUser: User = new this.userModel(userData);
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
    const user: User = await this.findUser(userId);
    user.set(userData);
    const result = user.save();
    return result;
  }

  async addGroup(userId: string, groupId: string) {
    const user: User = await this.findUser(userId);
    user.groups = user.groups || [];
    let propagate = false;
    if (!user.groups.includes(groupId)) {
      user.groups.push(groupId);
      user.groups = [...new Set(user.groups)];
      propagate = true;
    }
    const result = user.save();
    if (propagate) {
      //     await this.groupsService.upsertUser(groupId, userId);
    }
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
