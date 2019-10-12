import { Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';
import { IndigeoService } from './indigeo/indigeo.service';
import { SiteDTO } from '../../resources/base/sites/site.model';

@Injectable()
export class SitesListingService {
  constructor(
    private config: ConfigService,
    private indigeoService: IndigeoService,
  ) {}

  // Call related weather info service
  async getSitesListing(): Promise<any> {
    const providerList = this.getSitesListingApiProvider();
    let sites: SiteDTO[] = [];
    // indigo.fr
    if (providerList.includes('indigeo')) {
      const rawData: any = await this.indigeoService.getSitesListing();
      sites = await this.indigeoService.convertRawToGenerationOceanFormat(
        rawData,
      );
    }

    return sites;
  }

  private getSitesListingApiProvider(): string[] {
    const fromConfig = this.config.get('PROVIDER_SITES_LISTING_LIST');
    if (fromConfig != null) {
      return fromConfig.split(',');
    } else {
      return ['indigeo'];
    }
  }
}
