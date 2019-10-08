import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Quadrat } from './quadrat.model';

@Injectable()
export class QuadratsService {
  constructor(
    @InjectModel('Quadrat')
    private readonly quadratModel: Model<Quadrat>,
  ) { }

  async insertQuadrat(quadratData: Quadrat) {
    const newQuadrat: Quadrat = new this.quadratModel(
      quadratData,
    );
    const result = await newQuadrat.save();
    return result;
  }

  async getSingleQuadrat(quadratId: string) {
    const quadrat: Quadrat = await this.findQuadrat(quadratId);
    return quadrat;
  }

  async updateQuadrat(quadratId: string, quadratData: Quadrat) {
    const updatedQuadrat: Quadrat = await this.findQuadrat(
      quadratId,
    );
    updatedQuadrat.set(quadratData);
    const result = updatedQuadrat.save();
    return result;
  }

  async getQuadratsByTransect(transectId: string) {
    const quadrats = await this.quadratModel.find({ transect_id: transectId }).exec();
    return quadrats;
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

}
