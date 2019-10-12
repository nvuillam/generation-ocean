import { Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';
import { OpenWeatherMapService } from './openweathermap/openweathermap.service';
import { Weather, WeatherDTO } from './weather.model';
import { IfremerService } from './ifremer/ifremer.service';
import { SitesService } from '../../resources/base/sites/sites.service';

@Injectable()
export class WeatherService {
  constructor(
    private config: ConfigService,
    private openWeatherMapService: OpenWeatherMapService,
    private ifremerService: IfremerService,
    private sitesService: SitesService,
  ) {}

  // Call related weather info service
  async manageLocalWeatherInfo(quadrat: any): Promise<WeatherDTO> {
    const weatherProviderList = this.getWeatherApiProviders();
    let weather: WeatherDTO = {
      raw_results: {},
      sea_surface_temperature: null,
      sea_level: null,
    };
    // OpenWeatherMap.com
    if (weatherProviderList.includes('openweathermap')) {
      const rawData: any = await this.openWeatherMapService.getLocalWeatherInfo(
        quadrat.pos_latitude,
        quadrat.pos_longitude,
      );
      weather.raw_results.openweathermap = rawData;
      const weatherConvertedData: any = await this.openWeatherMapService.convertRawToGenerationOceanFormat(
        rawData,
      );
      // append parsed results to Weather object
      weather = {
        ...weather,
        ...weatherConvertedData,
      };
    }
    // Ifremer seaLevel
    if (
      weatherProviderList.includes('ifremer-surface-temp-info') &&
      quadrat.site != null
    ) {
      const site = await this.sitesService.getSingleSite(quadrat.site);
      const rawData: any = await this.ifremerService.getSeaSurfaceTemperatureInfo(
        site.related_sea_latitude,
        site.related_sea_longitude,
      );
      weather.raw_results.ifremersurfacetempinfo = rawData;
      const weatherConvertedData: any = await this.ifremerService.convertRawToGenerationOceanFormatSeaFormat(
        rawData,
      );
      // append parsed results to Weather object
      weather = {
        ...weather,
        ...weatherConvertedData,
      };
    }
    return weather;
  }

  private getWeatherApiProviders(): string[] {
    const fromConfig = this.config.get('PROVIDER_WEATHER_LIST');
    if (fromConfig != null) {
      return fromConfig.split(',');
    } else {
      return ['openweathermap', 'ifremer-surface-temp-info'];
    }
  }
}
