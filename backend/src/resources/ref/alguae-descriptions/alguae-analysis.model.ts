/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const AlguaeAnalysisSchema = new mongoose.Schema({
  _id: { type: String },
  description_id: { type: String },
  code: { type: String, required: true },
  abundance_index: { type: Number },
  picture_url: { type: String },
});

export interface AlguaeAnalysis extends mongoose.Document {
  _id: string;
  description_id: string;
  code: string;
  abundance_index: number;
  picture_url: string;
}

export class AlguaeAnalysisDTO {
  @ApiModelProperty({ example: '5d9a3ad6f9967419acde0731' })
  _id: string;
  @ApiModelProperty({ example: '5d9a3ad6f9967419acde0731' })
  description_id: string;
  @ApiModelProperty({ example: 'xxxxxx' })
  code: string;
  @ApiModelProperty({ example: 'coucou' })
  picture_url: string;
  @ApiModelProperty({ example: 4 })
  abundance_index: number;
}
