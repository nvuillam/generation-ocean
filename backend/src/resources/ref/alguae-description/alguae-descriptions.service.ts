import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AlguaeDescription } from './alguae-description.model';

@Injectable()
export class AlguaeDescriptionsService {
  constructor(
    @InjectModel('AlguaeDescription')
    private readonly siteModel: Model<AlguaeDescription>,
  ) {}

  async getAlguaeDescriptions(params: object) {
    const alguaes = [];
    return alguaes;
  }

  async getSingleAlguaeDescription(siteId: string) {
    return {};
  }
}
