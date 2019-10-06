/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const TransectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  observation_id: { type: ObjectId, required: true},
  site_id: {type: ObjectId, required: true},
  start_pos_latitude: {type: Number},
  start_pos_longitude: {type: Number},
  end_pos_latitude: {type: Number},
  end_pos_longitude: {type: Number},
  sifting_trace: { type: Boolean},
  motor_access: { type: Boolean},
  foreshore_cumulated_length_m : {type: Number},
  foreshore_average_width_m : {type: Number},
  foreshore_average_thickness_cm : {type: Number},
  created_at: { type: Date, default: Date.now },
  additional_info: String,
});

export interface Transect extends mongoose.Document {
  _id: string;
  name: string;
  observation_id: string;
  site_id: string ;
  start_pos_latitude: number ;
  start_pos_longitude: number ;
  end_pos_latitude: number ;
  end_pos_longitude: number ;
  sifting_trace: boolean;
  motor_access: boolean;
  foreshore_cumulated_length_m: number ;
  foreshore_average_width_m: number ;
  foreshore_average_thickness_mm: number ;
  created_at: Date;
  additional_info: string;
}

export class TransectDTO {
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  created_at: Date;
  @ApiModelProperty()
  observation_id: string ;
  @ApiModelProperty()
  site_id: string ;
  @ApiModelProperty()
  start_pos_latitude: number ;
  @ApiModelProperty()
  start_pos_longitude: number ;
  @ApiModelProperty()
  end_pos_latitude: number ;
  @ApiModelProperty()
  end_pos_longitude: number ;
  @ApiModelProperty()
  sifting_trace: boolean ;
  @ApiModelProperty()
  motor_access: boolean ;
  @ApiModelProperty()
  foreshore_cumulated_length_m: number;
  @ApiModelProperty()
  foreshore_average_width_m: number;
  @ApiModelProperty()
  foreshore_average_thickness_cm: number;
  @ApiModelProperty()
  additional_info: string;
}
