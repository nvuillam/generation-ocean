import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as alguaeDescriptionFromLocalJson from '../../../assets/alguae-descriptions.default.json'
import { AlguaeDescription, AlguaeDescriptionDTO } from './alguae-description.model';

@Injectable()
export class AlguaeDescriptionsService {
  constructor(
    @InjectModel('AlguaeDescription')
    private readonly siteModel: Model<AlguaeDescription>,
  ) {
    this.allAlguaeDescriptions = alguaeDescriptionFromLocalJson;
  }

  allAlguaeDescriptions: Map<string, any>[]

  async getAlguaeDescriptions(params: object) {
    const alguaes = this.allAlguaeDescriptions
    return alguaes;
  }

  async getSingleAlguaeDescription(alguaeDescriptionId: string) {
    return this.allAlguaeDescriptions.find(v => v['_id'] === alguaeDescriptionId);
  }

}
