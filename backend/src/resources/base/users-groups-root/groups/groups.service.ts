import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Group } from './group.model';

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

  private async findGroup(id: string): Promise<Group> {
    let group;
    try {
      group = await this.groupModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find group.');
    }
    if (!group) {
      throw new NotFoundException('Could not find group.');
    }
    return group;
  }
}
