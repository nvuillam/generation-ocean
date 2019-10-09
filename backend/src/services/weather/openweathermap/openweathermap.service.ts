import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '../../../config/config.service';
import { Weather, WeatherDTO } from '../weather.model';

@Injectable()
export class OpenWeatherMapService {
  constructor(private http: HttpService, private config: ConfigService) {}

  async getLocalWeatherInfo(
    posLatitude: number,
    posLongitude: number,
  ): Promise<any> {
    const baseUri = this.getOpenStreetMapBaseApiUrl();
    const apiKey = this.getOpenStreetMapApiKey();
    const uri =
      baseUri +
      `/weather?lat=${posLatitude}&lon=${posLongitude}&APPID=${apiKey}`;
    const obs = this.http.get(uri).pipe(map(response => response.data));
    return obs.toPromise();
  }

  async convertRawToGenerationOceanFormat(rawData) {
    const weather = new WeatherDTO();
    if (rawData.main && rawData.main.sea_level) {
      weather.sea_level = rawData.main.sea_level;
    }
    return weather;
  }

  private getOpenStreetMapBaseApiUrl(): string {
    return (
      this.config.get('API_ROOT_OPENWEATHERMAP') ||
      'https://api.openweathermap.org/data/2.5'
    );
  }

  private getOpenStreetMapApiKey(): string {
    return (
      this.config.get('API_KEY_OPENWEATHERMAP') ||
      'cc28f1d6af51ba51961d18ac63d78a99'
    );
  }
}
