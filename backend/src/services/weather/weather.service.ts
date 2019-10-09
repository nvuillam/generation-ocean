import { Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';
import { OpenWeatherMapService } from './openweathermap/openweathermap.service';
import { Weather } from './weather.model';

@Injectable()
export class WeatherService {
  constructor(
    private config: ConfigService,
    private openWeatherMapService: OpenWeatherMapService,
  ) {}

  // Call related weather info service
  async getLocalWeatherInfo(
    posLatitude: number,
    posLongitude: number,
  ): Promise<Weather> {
    const weatherProviderList = this.getWeatherApiProvider();
    let weather: Weather = {
      raw_results: {},
      sea_level: null,
    };
    // OpenWeatherMap.com
    if (weatherProviderList.includes('openweathermap')) {
      const rawData: any = await this.openWeatherMapService.getLocalWeatherInfo(
        posLatitude,
        posLongitude,
      );
      weather.raw_results.openweathermap = rawData;
      const weatherConvertedData: any = await this.openWeatherMapService.convertRawToGenerationOceanFormat(
        rawData,
      );
      weather = {
        ...weather,
        ...weatherConvertedData,
      };
    }

    return weather;
  }

  private getWeatherApiProvider(): string[] {
    const fromConfig = this.config.get('PROVIDER_WEATHER_LIST');
    if (fromConfig != null) {
      return fromConfig.split(',');
    } else {
      return ['openweathermap'];
    }
  }
}
