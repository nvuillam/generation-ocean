/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pos_longitude: { type: Number },
  pos_latitude: { type: Number },
  location: { type: String },
  west_bound_longitude: { type: Number },
  east_bound_longitude: { type: Number },
  south_bound_latitude: { type: Number },
  north_bound_latitude: { type: Number },
  related_sea_latitude: { type: Number },
  related_sea_longitude: { type: Number },
  created_at: { type: Date, default: Date.now },
  additional_info: String,
});

export interface Site extends mongoose.Document {
  _id: string;
  name: string;
  pos_longitude: number;
  pos_latitude: number;
  location: number;
  west_bound_longitude: number;
  east_bound_longitude: number;
  south_bound_latitude: number;
  north_bound_latitude: number;
  related_sea_latitude: number;
  related_sea_longitude: number;
  created_at: Date;
  additional_info: string;
}

export class SiteDTO {
  @ApiModelProperty({ example: '5d987dc90ed4833f3c28072c' })
  _id: string;
  @ApiModelProperty({ example: 'Plage des glénans' })
  name: string;
  @ApiModelProperty({ example: 'Brest (Finistère)' })
  location: string;
  @ApiModelProperty({ example: 48.8025884 })
  pos_longitude: number;
  @ApiModelProperty({ example: 2.1847466 })
  pos_latitude: number;
  @ApiModelProperty({ example: 48.8025884 })
  west_bound_longitude: number;
  @ApiModelProperty({ example: 2.1847466 })
  east_bound_longitude: number;
  @ApiModelProperty({ example: 48.8025884 })
  south_bound_latitude: number;
  @ApiModelProperty({ example: 2.1847466 })
  north_bound_latitude: number;
  @ApiModelProperty({ example: 48.8025884 })
  related_sea_latitude: number;
  @ApiModelProperty({ example: 2.1847466 })
  related_sea_longitude: number;
  @ApiModelProperty({ example: '2019-10-06T21:18:44.471Z' })
  created_at: Date;
  @ApiModelProperty({
    example: 'Tout commentaire additionnel sur le site d\'observation',
  })
  additional_info: string;
}
