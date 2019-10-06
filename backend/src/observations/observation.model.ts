/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const ObservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  site_id: ObjectId,
  group_id: ObjectId,
  protocol: { type: String, enum: ['ALAMER'] },
  status: {
    type: String,
    enum: ['draft', 'ready', 'current', 'validation_requested', 'validated'],
  },
  created_at: { type: Date, default: Date.now },
  started_at: { type: Date },
  additional_info: String,
});

export interface Observation extends mongoose.Document {
  _id: string;
  name: string;
  site_id: string;
  group_id: string;
  protocol: string;
  status: string;
  created_at: Date;
  started_at: Date;
  additional_info: string;
}

export class ObservationDTO {
  @ApiModelProperty()
  _id: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  site_id: string;
  @ApiModelProperty()
  group_id: string;
  @ApiModelProperty({ enum: ['ALAMER'] })
  protocol: string;
  @ApiModelProperty({
    enum: ['draft', 'ready', 'current', 'validation_requested', 'validated'],
  })
  status: string;
  @ApiModelProperty()
  created_at: Date;
  @ApiModelProperty()
  started_at: Date;
  @ApiModelProperty()
  additional_info: string;
}
