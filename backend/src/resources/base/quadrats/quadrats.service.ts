import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Quadrat } from './quadrat.model';
import {
  AlguaeAnalysis,
  AlguaeAnalysisDTO,
} from '../../ref/alguae-descriptions/alguae-analysis.model';
import { WeatherService } from '../../../services/weather/weather.service';

@Injectable()
export class QuadratsService {
  constructor(
    @InjectModel('Quadrat')
    private readonly quadratModel: Model<Quadrat>,
    private readonly weatherService: WeatherService,
  ) {}

  async insertQuadrat(quadratData: Quadrat) {
    const newQuadrat: Quadrat = new this.quadratModel(quadratData);
    const result = await newQuadrat.save().then(savedQuadrat => {
      return this.manageQuadratWeatherData(savedQuadrat);
    });
    return result;
  }

  async getSingleQuadrat(quadratId: string) {
    const quadrat: Quadrat = await this.findQuadrat(quadratId);
    return quadrat;
  }

  async updateQuadrat(quadratId: string, quadratData: Quadrat) {
    const updatedQuadrat: Quadrat = await this.findQuadrat(quadratId);
    updatedQuadrat.set(quadratData);
    const result = await updatedQuadrat.save().then(savedQuadrat => {
      return this.manageQuadratWeatherData(savedQuadrat);
    });
    return result;
  }

  async getQuadratsByTransect(transectId: string) {
    const quadrats = await this.quadratModel
      .find({ transect: transectId })
      .exec();
    return quadrats;
  }

  // List alguaes of a quadrat
  async getSingleQuadratAlguaes(quadratId: string) {
    const quadrat: Quadrat = await this.findQuadrat(quadratId);
    return quadrat.alguaes || [];
  }

  // Upsert alguae analysis in quadrat alguaes list
  async updateQuadratUpsertAlguaeAnalysis(
    quadratId: string,
    alguaeCode: string,
    alguaeAnalysis: AlguaeAnalysisDTO,
  ) {
    const quadrat: Quadrat = await this.findQuadrat(quadratId);
    quadrat.alguaes = quadrat.alguaes || [];
    const existingAlguaeAnalysis = quadrat.alguaes.find(
      v => v.code === alguaeCode,
    );

    if (existingAlguaeAnalysis) {
      // AlguaeAnalysis existing: replace it
      Object.keys(alguaeAnalysis).forEach(
        key => (existingAlguaeAnalysis[key] = alguaeAnalysis[key]),
      ); // copy values of alguaeAnalysis on existingAlguaeAnalysis
      const index = quadrat.alguaes.findIndex(v => v.code === alguaeCode);
      quadrat.alguaes[index] = existingAlguaeAnalysis;
      alguaeAnalysis = existingAlguaeAnalysis;
    } else {
      // AlguaeAnalysis not existing : add it
      alguaeAnalysis.code = alguaeCode;
      quadrat.alguaes.push(alguaeAnalysis);
    }
    quadrat.save();
    return alguaeAnalysis;
  }

  private async findQuadrat(id: string): Promise<Quadrat> {
    let quadrat;
    try {
      quadrat = await this.quadratModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find quadrat.');
    }
    if (!quadrat) {
      throw new NotFoundException('Could not find quadrat.');
    }
    return quadrat;
  }

  // Add weather data on quadrat ( only if GPS location is defined and weather has not been retrieved yet)
  async manageQuadratWeatherData(quadrat: Quadrat): Promise<Quadrat> {
    if (
      quadrat.pos_latitude != null &&
      quadrat.pos_longitude != null &&
      quadrat.weather == null
    ) {
      const localWeatherInfo = await this.weatherService.getLocalWeatherInfo(
        quadrat.pos_latitude,
        quadrat.pos_longitude,
      );
      // If weather info found, set it on the Observation
      if (localWeatherInfo) {
        quadrat.weather = localWeatherInfo;
        return quadrat.save();
      }
      return quadrat;
    }
  }
}
