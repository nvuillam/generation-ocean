import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Observation } from './observation.model';
import { Site } from '../sites/site.model';
import { SitesService } from '../sites/sites.service';
import { WeatherService } from '../../../services/weather/weather.service';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectModel('Observation')
    private readonly observationModel: Model<Observation>,
    private readonly sitesService: SitesService,
    private readonly weatherService: WeatherService,
  ) {}

  async insertObservation(observationData: Observation) {
    const newObservation: Observation = new this.observationModel(
      observationData,
    );
    const result = await newObservation.save().then(savedObservation => {
      return this.manageObservationWeatherData(savedObservation);
    });
    return result;
  }

  async getSingleObservation(observationId: string) {
    const observation: Observation = await this.findObservation(observationId);
    return observation;
  }

  async updateObservation(observationId: string, observationData: Observation) {
    const updatedObservation: Observation = await this.findObservation(
      observationId,
    );
    updatedObservation.set(observationData);
    const result = updatedObservation.save().then(savedObservation => {
      return this.manageObservationWeatherData(savedObservation);
    });
    return result;
  }

  async getObservationsBySite(siteId: string) {
    const observations = await this.observationModel
      .find({ site: siteId })
      .exec();
    return observations;
  }

  async getObservationsByUser(userId: string) {
    const observations = await this.observationModel
      .find({ user: userId })
      .exec();
    return observations;
  }

  async getObservationsByGroup(groupId: string) {
    const observations = await this.observationModel
      .find({ group: groupId })
      .exec();
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

  // Add weather data on observation ( only if GPS location is defined and weather has not been retrieved yet)
  async manageObservationWeatherData(
    observation: Observation,
  ): Promise<Observation> {
    if (observation.site != null && observation.weather == null) {
      const site: Site = await this.sitesService.getSingleSite(
        observation.site,
      );
      if (site.pos_latitude != null && site.pos_longitude != null) {
        const localWeatherInfo = await this.weatherService.getLocalWeatherInfo(
          site.pos_latitude,
          site.pos_longitude,
        );
        // If weather info found, set it on the Observation
        if (localWeatherInfo) {
          observation.weather = localWeatherInfo;
          return observation.save();
        }
      }
    }
    return observation;
  }
}
