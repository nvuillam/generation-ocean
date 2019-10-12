import { Injectable, HttpService } from '@nestjs/common';
import * as NodeCache from 'node-cache';
import * as Xml2Js from 'xml-js';
import * as fs from 'fs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../../../config/config.service';
import { SiteDTO } from '../../../resources/base/sites/site.model';

@Injectable()
export class IndigeoService {
  constructor(private http: HttpService, private config: ConfigService) {
    this.nodeCache = new NodeCache({ stdTTL: 604800, checkperiod: 3600 });
  }

  nodeCache: any;

  async getSitesListing(): Promise<any> {
    const baseUri = this.getIndigoApiUrl();
    const uri =
      baseUri + '/ows?service=wms&version=1.3.0&request=GetCapabilities';
    // Check xml is in cache
    const cachedVal = this.nodeCache.get(uri);
    if (cachedVal == null) {
      // http call then set in cache
      const obs = this.http.get(uri).pipe(map(response => response.data));
      const obsPromise = obs.toPromise();
      const self = this;
      obsPromise.then((rawVal: any) => {
        self.nodeCache.set(uri, rawVal);
      });
      return obsPromise;
    } else {
      // Return cache
      return Promise.resolve(cachedVal);
    }
  }

  async convertRawToGenerationOceanFormat(rawData): Promise<SiteDTO[]> {
    const filterStartsWithNameList: any[] = [
      ['Trait de côte - Plage', 'Plage'],
      ['Traits de côte - Plage', 'Plage'],
      ['Traits de côte - plage', 'Plage'],
    ];
    // Parse XML to Json
    const indigeoJson: any = Xml2Js.xml2json(rawData, {
      compact: true,
      spaces: 4,
    });
    const indigeoObj: any = JSON.parse(indigeoJson);
    const sites: SiteDTO[] = [];
    indigeoObj.WMS_Capabilities.Capability.Layer.Layer.forEach(layer => {
      // Parse layer
      let siteNameFull: string = layer.Title._text;
      if (siteNameFull == null) {
        return;
      }
      let filterFound: string = null;
      // Check filters
      filterStartsWithNameList.forEach(filter => {
        if (filterFound == null && siteNameFull.includes(filter[0])) {
          filterFound = filter;
        }
      });
      if (filterFound == null) {
        return;
      }
      siteNameFull = siteNameFull.replace(filterFound[0], filterFound[1]);
      const siteNameSplit = siteNameFull.split(',');
      let siteName = siteNameSplit[0];
      let siteLocation = '';
      if (siteNameSplit[1]) {
        siteName = siteNameSplit[0];
        siteLocation = siteNameSplit[1];
      }
      const site: any = {
        name: siteName,
        location: siteLocation,
        west_bound_longitude: parseFloat(
          layer.EX_GeographicBoundingBox.westBoundLongitude._text,
        ),
        east_bound_longitude: parseFloat(
          layer.EX_GeographicBoundingBox.eastBoundLongitude._text,
        ),
        south_bound_latitude: parseFloat(
          layer.EX_GeographicBoundingBox.southBoundLatitude._text,
        ),
        north_bound_latitude: parseFloat(
          layer.EX_GeographicBoundingBox.northBoundLatitude._text,
        ),
      };
      sites.push(site);
    });
    return sites;
  }

  private getIndigoApiUrl(): string {
    return (
      this.config.get('API_ROOT_INDIGO_FR') ||
      'http://portail.indigeo.fr/geoserver'
    );
  }
}
