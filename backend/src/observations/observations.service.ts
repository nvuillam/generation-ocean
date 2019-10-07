import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Observation } from './observation.model';
import { Site } from '../sites/site.model';
import { SitesService } from '../sites/sites.service';
import { Weather } from '../services/weather/weather.model';
import { WeatherService } from '../services/weather/weather.service';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectModel('Observation')
    private readonly observationModel: Model<Observation>,
    private readonly sitesService: SitesService,
    private readonly weatherService: WeatherService
  ) { }

  async insertObservation(observationData: Observation) {
    const newObservation: Observation = new this.observationModel(
      observationData,
    );
    const result = await newObservation.save();
    return result;
  }

  /*  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  */

  async getSingleObservation(observationId: string) {
    const observation: Observation = await this.findObservation(observationId);
    return observation;
  }

  async updateObservation(observationId: string, observationData: Observation) {
    const updatedObservation: Observation = await this.findObservation(
      observationId,
    );
    updatedObservation.set(observationData);
    const result = updatedObservation.save();
    return result;
  }

  async getObservationsBySite(siteId: string) {
    const observations = await this.observationModel.find({ site_id: siteId }).exec();
    return observations;
  }

  /*
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }
 */
  private async findObservation(id: string): Promise<Observation> {
    let observation;
    try {
      observation = await this.observationModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find observation.');
    }
    if (!observation) {
      throw new NotFoundException('Could not find observation.');
    }
    return observation;
  }

  // Add weather data on observation ( only if GPS location is defined)
  private async manageWeatherData(force: boolean = false, observationDataFromClient: Observation, observationId: string) {
    let localWeatherInfo: Weather;
    if (observationDataFromClient.site_id != null) {
      const site: Site = await this.sitesService.getSingleSite(observationDataFromClient.site_id);
      if (site.pos_latitude != null && site.pos_longitude != null) {
        localWeatherInfo = await this.weatherService.getLocalWeatherInfo(site.pos_latitude, site.pos_longitude)
      }
    }
    // If weather info found, set it on the Observation
    if (localWeatherInfo) {
      const storedObservation: Observation = await this.findObservation(observationId)
      storedObservation.weather = localWeatherInfo
      const result = storedObservation.save()
      return result
    }
    else
      return null
  }
}
