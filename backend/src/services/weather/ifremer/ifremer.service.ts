import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import * as Xml2Js from 'xml-js';

import { ConfigService } from '../../../config/config.service';
import { Weather, WeatherDTO } from '../weather.model';

@Injectable()
export class IfremerService {
  constructor(private http: HttpService, private config: ConfigService) {}

  async getSeaSurfaceTemperatureInfo(
    posLatitude: number,
    posLongitude: number,
  ): Promise<any> {
    const baseUri = this.getIfremerBaseApiUrl();
    const apiLongitudeMin: number = posLongitude - 0.001;
    const apiLatitudeMin: number = posLatitude - 0.001;
    const apiLongitudeMax: number = posLongitude + 0.001;
    const apiLatitudeMax: number = posLatitude + 0.001;
    // Build date with only started hour
    const nowTime = new Date(); // ex:TIME=2019-10-12T00%3A00%3A00.000Z
    const hours = nowTime.getHours();
    nowTime.setHours(hours, 0, 0, 0);
    const nowTimeStartHourStr = nowTime.toISOString();
    const uri =
      baseUri +
      `thredds/wms/MARC-MANGAE2500-MARS3D_F1-FOR_FULL_TIME_SERIE?LAYERS=TEMP&ELEVATION=-0.012500000186264515&TIME=${encodeURIComponent(
        nowTimeStartHourStr,
      )}&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&SRS=EPSG%3A4326&BBOX=${apiLongitudeMin},${apiLatitudeMin},${apiLongitudeMax},${apiLatitudeMax}&X=1&Y=1&INFO_FORMAT=text%2Fxml&QUERY_LAYERS=TEMP&WIDTH=3&HEIGHT=3`;
    const obs = this.http.get(uri).pipe(map(response => response.data));
    return obs.toPromise();
  }

  async convertRawToGenerationOceanFormatSeaFormat(rawData) {
    const weather = new WeatherDTO();
    const ifremerJson: any = JSON.parse(
      Xml2Js.xml2json(rawData, { compact: true, spaces: 4 }),
    );
    if (
      ifremerJson.FeatureInfoResponse &&
      ifremerJson.FeatureInfoResponse.FeatureInfo &&
      ifremerJson.FeatureInfoResponse.FeatureInfo.value &&
      ifremerJson.FeatureInfoResponse.FeatureInfo.value._text
    ) {
      weather.sea_surface_temperature = parseFloat(
        ifremerJson.FeatureInfoResponse.FeatureInfo.value._text,
      );
    }
    return weather;
  }

  private getIfremerBaseApiUrl(): string {
    return this.config.get('API_ROOT_IFREMER') || 'http://tds1.ifremer.fr/';
  }
}
