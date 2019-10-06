/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pos_longitude: {type: Number},
  pos_latitude: {type: Number},  
  created_at: { type: Date, default: Date.now },
  additional_info: String,
});

export interface Site extends mongoose.Document {
  _id: string;
  name: string;
  pos_longitude: number ;
  pos_latitude: number ;
  created_at: Date;
  additional_info: string;
}

export class SiteDTO {
  @ApiModelProperty()
  _id: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  pos_longitude: number ;
  @ApiModelProperty()
  pos_latitude: number ; 
  @ApiModelProperty()
  created_at: Date;
  @ApiModelProperty()
  additional_info: string;
}
