import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Site, SiteDTO } from './site.model';
import { SitesListingService } from '../../../services/sites-listing/sites-listing.service';

@Injectable()
export class SitesService {
  constructor(
    @InjectModel('Site')
    private readonly siteModel: Model<Site>,
    private readonly sitesListingService: SitesListingService,
  ) {}

  async insertSite(siteData: Site) {
    const newSite: Site = new this.siteModel(siteData);
    const result = await newSite.save();
    return result;
  }

  async getSites(params: object) {
    const sites = await this.siteModel.find(params).exec();
    return sites;
  }

  async getSingleSite(siteId: string) {
    const site: Site = await this.findSite(siteId);
    return site;
  }

  async getSingleSiteByLatitudeLongitude(latitude: number, longitude: number) {
    const constraint = {
      west_bound_longitude: { $lte: longitude },
      east_bound_longitude: { $gte: longitude },
      south_bound_latitude: { $lte: latitude },
      north_bound_latitude: { $gte: latitude },
    };

    /*
    "west_bound_longitude": -4.4122803261631205,
    "east_bound_longitude": -4.394450546989356,
    "south_bound_latitude": 48.65389632811334,
    "north_bound_latitude": 48.65715353764969,
    */

    const sites: Site[] = await this.siteModel.find(constraint).exec();
    if (sites.length === 1) {
      return sites[0];
    } else {
      return null;
    }
  }

  async updateSite(siteId: string, siteData: Site) {
    const updatedSite: Site = await this.findSite(siteId);
    updatedSite.set(siteData);
    const result = updatedSite.save();
    return result;
  }

  async refreshSitesListing() {
    const sites: SiteDTO[] = await this.sitesListingService.getSitesListing();
    const bulkOps = [];
    sites.forEach(async (site: any) => {
      const upsertDoc = {
        updateOne: {
          filter: { name: site.name },
          update: site,
          upsert: true,
        },
      };
      bulkOps.push(upsertDoc);
    });

    /* this.siteModel.collection.bulkWrite(bulkOps)
      .then(bulkWriteOpResult => {
        console.debug('BULK update OK');
        console.debug(JSON.stringify(bulkWriteOpResult, null, 2));
      })
      .catch(err => {
        console.debug('BULK update error');
        console.debug(JSON.stringify(err, null, 2));
      }); */
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
