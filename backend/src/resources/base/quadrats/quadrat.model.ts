/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const QuadratSchema = new mongoose.Schema({
  name: { type: String, required: true },
  transect_id: { type: ObjectId, required: true },
  alguae: { type: Array },
  created_at: { type: Date, default: Date.now },
  additional_info: String,
});

export interface Quadrat extends mongoose.Document {
  _id: string;
  name: string;
  transect_id: string;
  alguae: any[];
  created_at: Date;
  additional_info: string;
}

export class QuadratDTO {
  @ApiModelProperty({ example: '5d9a3ad6f9967419acde0731' })
  _id: string;
  @ApiModelProperty({ example: 'Q1' })
  name: string;
  @ApiModelProperty({ example: '5d987dc90ed4833f3c28072c' })
  transect_id: string;
  @ApiModelProperty({
    example: [
      { name: 'XXX', abundance_index: 4 },
      { name: 'YYY', abundance_index: 2 },
    ],
  })
  alguae: any[];
  @ApiModelProperty({ example: '2019-10-06T21:18:44.471Z' })
  created_at: Date;
  @ApiModelProperty({ example: 'Tout commentaire additionnel sur le quadrat' })
  additional_info: string;
}