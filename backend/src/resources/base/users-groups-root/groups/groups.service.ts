import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Group } from './group.model';
import { UserDTO } from '../users/user.model';
// import { UsersService } from '../users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel('Group')
    private readonly groupModel: Model<Group>,
  ) {}

  async insertGroup(groupData: Group) {
    const newGroup: Group = new this.groupModel(groupData);
    const result = await newGroup.save();
    return result;
  }

  async getGroups(params: object) {
    const groups = await this.groupModel.find(params).exec();
    return groups;
  }

  async getSingleGroup(groupId: string) {
    const group: Group = await this.findGroup(groupId);
    return group;
  }

  async updateGroup(groupId: string, groupData: Group) {
    const updatedGroup: Group = await this.findGroup(groupId);
    updatedGroup.set(groupData);
    const result = updatedGroup.save();
    return result;
  }

  async listUsers(groupId: string) {
    const group: Group = await this.findGroup(groupId, true);
    return (group.users as unknown) as UserDTO[];
  }

  async upsertUser(
    groupId: string,
    userId: string,
    isModerator: boolean = null,
  ) {
    const group: Group = await this.findGroup(groupId);
    // Users
    group.users = group.users || [];
    let propagate = false;
    if (!group.users.includes(userId)) {
      group.users.push(userId);
      group.users = [...new Set(group.users)];
      propagate = true;
    }
    // Moderators
    group.moderators = group.moderators || [];
    if (isModerator === true && !group.moderators.includes(userId)) {
      group.moderators.push(userId);
    }
    if (isModerator === false && group.moderators.includes(userId)) {
      group.moderators = group.moderators.filter(e => e !== userId);
    }
    const result = group.save();
    if (propagate) {
      //      await this.usersService.addGroup(userId, groupId);
    }
    return;
  }

  private async findGroup(
    id: string,
    populate: boolean = false,
  ): Promise<Group> {
    let group;
    try {
      if (populate) {
        group = await this.groupModel
          .findById(id)
          .populate('users')
          .exec();
      } else {
        group = await this.groupModel.findById(id).exec();
      }
    } catch (error) {
      throw new NotFoundException('Could not find group.');
    }
    if (!group) {
      throw new NotFoundException('Could not find group.');
    }
    return group;
  }
}
