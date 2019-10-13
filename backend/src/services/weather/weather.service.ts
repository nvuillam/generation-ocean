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
  ) { }

  // Call related weather info service
  async manageLocalWeatherInfo(quadrat: any): Promise<WeatherDTO> {
    const weatherProviderList = this.getWeatherApiProviders();
    let weather: WeatherDTO = {
      raw_results: {},
      sea_surface_temperature: null,
      sea_level: null,
      swell_height: null,
      swell_direction: null,
      current_eastward: null,
      current_northward: null,
      current_direction: null,
      current_speed: null,
      tide_coef: null,
      tide_time: null,
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

    // Ifremer swell height
    if (
      weatherProviderList.includes('ifremer-swell-info') &&
      quadrat.site != null
    ) {
      const site = await this.sitesService.getSingleSite(quadrat.site);
      const rawData: any = await this.ifremerService.getSwellInfo(
        site.related_sea_latitude,
        site.related_sea_longitude,
      );
      weather.raw_results.ifremersurfacetempinfo1 = rawData;
      const weatherConvertedData: any = await this.ifremerService.convertRawToGenerationOceanFormatSwell(
        rawData,
      );
      // append parsed results to Weather object
      weather = {
        ...weather,
        ...weatherConvertedData,
      };
    }

    // Ifremer swell direction
    if (
      weatherProviderList.includes('ifremer-swell-info') &&
      quadrat.site != null
    ) {
      const site = await this.sitesService.getSingleSite(quadrat.site);
      const rawData: any = await this.ifremerService.getSwellDirectionInfo(
        site.related_sea_latitude,
        site.related_sea_longitude,
      );
      weather.raw_results.ifremerswellinfo2 = rawData;
      const weatherConvertedData: any = await this.ifremerService.convertRawToGenerationOceanFormatSwellDirection(
        rawData,
      );
      // append parsed results to Weather object
      weather = {
        ...weather,
        ...weatherConvertedData,
      };
    }

    // Ifremer northward current
    if (
      weatherProviderList.includes('ifremer-northward-current') &&
      quadrat.site != null
    ) {
      const site = await this.sitesService.getSingleSite(quadrat.site);
      const rawData: any = await this.ifremerService.getNorthwardCurrentInfo(
        site.related_sea_latitude,
        site.related_sea_longitude,
      );
      weather.raw_results.ifremernorthwardcurrent = rawData;
      const weatherConvertedData: any = await this.ifremerService.convertRawToGenerationOceanFormatNorthwardCurrent(
        rawData,
      );
      // append parsed results to Weather object
      weather = {
        ...weather,
        ...weatherConvertedData,
      };
    }

    // Ifremer eastward current
    if (
      weatherProviderList.includes('ifremer-eastward-current') &&
      quadrat.site != null
    ) {
      const site = await this.sitesService.getSingleSite(quadrat.site);
      const rawData: any = await this.ifremerService.getEastwardCurrentInfo(
        site.related_sea_latitude,
        site.related_sea_longitude,
      );
      weather.raw_results.ifremereastwardcurrent = rawData;
      const weatherConvertedData: any = await this.ifremerService.convertRawToGenerationOceanFormatEastwardCurrent(
        rawData,
      );
      // append parsed results to Weather object
      weather = {
        ...weather,
        ...weatherConvertedData,
      };
    }

    // Current direction
    if (weather.current_eastward && weather.current_northward) {
      weather.current_direction =
        (Math.atan2(weather.current_eastward, weather.current_northward) *
          180) /
        3.14;
      weather.current_speed = Math.sqrt((weather.current_eastward * weather.current_eastward) + (weather.current_northward * weather.current_northward));
    }

    // Tide // TODO Fichier SHOM XLS Ports de réference
    weather.tide_coef = 85;
    weather.tide_time = 'PM-3H';

    return weather;
  }

  private getWeatherApiProviders(): string[] {
    const fromConfig = this.config.get('PROVIDER_WEATHER_LIST');
    if (fromConfig != null) {
      return fromConfig.split(',');
    } else {
      return [
        'openweathermap',
        'ifremer-surface-temp-info',
        'ifremer-swell-info',
        'ifremer-eastward-current',
        'ifremer-northward-current',
      ];
    }
  }
}
