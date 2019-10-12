import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as alguaeDescriptionFromLocalJson from '../../../assets/alguae-descriptions.default.json';
import {
  AlguaeDescription,
  AlguaeDescriptionDTO,
} from './alguae-description.model';

@Injectable()
export class AlguaeDescriptionsService {
  constructor(
    @InjectModel('AlguaeDescription')
    private readonly siteModel: Model<AlguaeDescription>,
  ) {
    this.allAlguaeDescriptions = (alguaeDescriptionFromLocalJson as unknown) as AlguaeDescriptionDTO[];
  }

  private allAlguaeDescriptions: AlguaeDescriptionDTO[];

  async getAlguaeDescriptions(params: any) {
    let alguaes = this.allAlguaeDescriptions;
    if (params.color) {
      alguaes = alguaes.filter(v => v.color === params.color);
    }
    if (params.shape) {
      alguaes = alguaes.filter(v => v.shape === params.shape);
    }
    return alguaes;
  }

  async getSingleAlguaeDescription(alguaeDescriptionId: string) {
    return this.allAlguaeDescriptions.find(v => v.code === alguaeDescriptionId);
  }
}
