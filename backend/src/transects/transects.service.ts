import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Transect } from './transect.model';

@Injectable()
export class TransectsService {
  constructor(
    @InjectModel('Transect')
    private readonly transectModel: Model<Transect>,
  ) {}

  async insertTransect(transectData: Transect) {
    const newTransect: Transect = new this.transectModel(
      transectData,
    );
    const result = await newTransect.save();
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

  async getSingleTransect(transectId: string) {
    const transect: Transect = await this.findTransect(transectId);
    return transect;
  }

  async updateTransect(transectId: string, transectData: Transect) {
    const updatedTransect: Transect = await this.findTransect(
      transectId,
    );
    updatedTransect.set(transectData);
    const result = updatedTransect.save();
    return result;
  }

  async getTransectsByObservation(observationId: string) {
    const transects = await this.transectModel.find({observation_id: observationId }).exec();
    return transects ;
  }

  /*
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }
 */
  private async findTransect(id: string): Promise<Transect> {
    let transect;
    try {
      transect = await this.transectModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find transect.');
    }
    if (!transect) {
      throw new NotFoundException('Could not find transect.');
    }
    return transect;
  }

}
