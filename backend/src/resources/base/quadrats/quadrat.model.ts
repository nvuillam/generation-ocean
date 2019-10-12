/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { AlguaeAnalysisSchema } from '../../ref/alguae-descriptions/alguae-analysis.model';
import { WeatherDTO, Weather } from '../../../services/weather/weather.model';

const ObjectId = mongoose.Schema.Types.ObjectId;

function isRequiredForQuadratToBeAssigned() {
  return false; // this.status != null && this.status !== 'draft';
}
function isRequiredForQuadratToBeValidated() {
  return this.status != null && this.status !== 'draft';
}

export const QuadratSchema = new mongoose.Schema({
  name: {
    type: String,
    required: isRequiredForQuadratToBeAssigned,
  },
  transect: {
    type: ObjectId,
    required: isRequiredForQuadratToBeAssigned,
    ref: 'Transect',
  },
  pos_latitude: {
    type: Number
  },
  pos_longitude: {
    type: Number
  },
  status: {
    type: String,
    enum: ['draft', 'ready', 'current', 'validation_requested', 'validated'],
    default: 'draft',
  },
  alguaes: {
    type: [AlguaeAnalysisSchema],
    required: isRequiredForQuadratToBeValidated,
  },
  created_at: { type: Date, default: Date.now },
  additional_info: String,
  weather: {
    type: Map,
  },
});

export interface Quadrat extends mongoose.Document {
  _id: string;
  name: string;
  transect: string;
  status: string;
  pos_latitude: number;
  pos_longitude: number;
  alguaes: any[];
  created_at: Date;
  additional_info: string;
  weather: Weather;
}

export class QuadratDTO {
  @ApiModelProperty({ example: '5d9a3ad6f9967419acde0731' })
  _id: string;
  @ApiModelProperty({ example: 'Q1' })
  name: string;
  @ApiModelProperty({ example: '5d987dc90ed4833f3c28072c' })
  transect: string;
  @ApiModelProperty({
    enum: ['draft', 'ready', 'current', 'validation_requested', 'validated'],
    example: 'draft',
  })
  status: string;
  @ApiModelProperty({ example: 48.12345 })
  pos_latitude: number;
  @ApiModelProperty({ example: 2.3455 })
  pos_longitude: number;
  @ApiModelProperty({
    example: [
      { description_id: 'xxxxxx', code: 'xxxxxx', abundance_index: 4 },
      { description_id: 'yyyyyyy', code: 'yyyyyyy', abundance_index: 2 },
    ],
  })
  alguaes: any[];
  @ApiModelProperty({ example: '2019-10-06T21:18:44.471Z' })
  created_at: Date;
  @ApiModelProperty({ example: 'Tout commentaire additionnel sur le quadrat' })
  additional_info: string;
  @ApiModelProperty()
  weather: WeatherDTO;
}
