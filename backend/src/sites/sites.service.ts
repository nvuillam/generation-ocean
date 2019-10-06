import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Site } from './site.model';

@Injectable()
export class SitesService {
  constructor(
    @InjectModel('Site')
    private readonly siteModel: Model<Site>,
  ) {}

  async insertSite(siteData: Site) {
    const newSite: Site = new this.siteModel(
      siteData,
    );
    const result = await newSite.save();
    return result;
  }

  async getSingleSite(siteId: string) {
    const site: Site = await this.findSite(siteId);
    return site;
  }

  async updateSite(siteId: string, siteData: Site) {
    const updatedSite: Site = await this.findSite(
      siteId,
    );
    updatedSite.set(siteData);
    const result = updatedSite.save();
    return result;
  }

  private async findSite(id: string): Promise<Site> {
    let site;
    try {
      site = await this.siteModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find site.');
    }
    if (!site) {
      throw new NotFoundException('Could not find site.');
    }
    return site;
  }
}
