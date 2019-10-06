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
  @ApiModelProperty({example: "5d987dc90ed4833f3c28072c"})
  _id: string;
  @ApiModelProperty({example: "Observations classe de mer école des mouettes"})
  name: string;
  @ApiModelProperty({example: "5d9a59858d57fa0e34f23a0e"})
  site_id: string;
  @ApiModelProperty({example: "5d9a59858d57fa0e34f23a0e"})
  group_id: string;
  @ApiModelProperty({ enum: ['ALAMER'] , example: "ALAMER"})
  protocol: string;
  @ApiModelProperty({
    enum: ['draft', 'ready', 'current', 'validation_requested', 'validated'],
    example: 'draft'
  })
  status: string;
  @ApiModelProperty({example: '2019-10-06T21:18:44.471Z'})
  created_at: Date;
  @ApiModelProperty({example: '2019-10-06T21:18:44.471Z'})
  started_at: Date;
  @ApiModelProperty({example: 'Tout commentaire additionnel sur l\'observation'})
  additional_info: string;
}
