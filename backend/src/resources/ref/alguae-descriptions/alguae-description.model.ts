/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const AlguaeDescriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  color: { type: String },
  shape: { type: String },
  description: { type: String },
  picture_url: { type: String },
  created_at: { type: Date, default: Date.now },
  additional_info: String,
});

export interface AlguaeDescription extends mongoose.Document {
  _id: string;
  code: string;
  name: string;
  color: string;
  shape: string;
  description: string;
  picture_url: string;
  created_at: Date;
  additional_info: string;
}

export class AlguaeDescriptionDTO {
  @ApiModelProperty({ example: '5d987dc90ed4833f3c28072c' })
  _id: string;
  @ApiModelProperty({ example: 'XXXXXX' })
  name: string;
  @ApiModelProperty({ example: 'XXXXXXXX' })
  code: string;
  @ApiModelProperty({ example: 'green' })
  color: string;
  @ApiModelProperty({ example: 'ruban' })
  shape: string;
  @ApiModelProperty({ example: 'Some blue alguae' })
  description: string;
  @ApiModelProperty({
    example:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Alpaca_headshot.jpg/260px-Alpaca_headshot.jpg',
  })
  picture_url: string;
  @ApiModelProperty({ example: '2019-10-06T21:18:44.471Z' })
  created_at: Date;
  @ApiModelProperty({
    example: 'Tout commentaire additionnel sur le site d\'observation',
  })
  additional_info: string;
}
