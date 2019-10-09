/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

function isRequiredForValidation() {
  return (
    this.status != null &&
    ['validation_requested', 'validated'].includes(this.status)
  );
}

export const TransectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  observation_id: {
    type: ObjectId,
    ref: 'Observation',
    required: true,
  },
  site_id: {
    type: ObjectId,
    ref: 'Site',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'ready', 'current', 'validation_requested', 'validated'],
    default: 'draft',
  },
  start_pos_latitude: {
    type: Number,
    required: isRequiredForValidation,
  },
  start_pos_longitude: {
    type: Number,
    required: isRequiredForValidation,
  },
  end_pos_latitude: {
    type: Number,
    required: isRequiredForValidation,
  },
  end_pos_longitude: {
    type: Number,
    required: isRequiredForValidation,
  },
  sifting_trace: {
    type: Boolean,
    required: isRequiredForValidation,
  },
  motor_access: {
    type: Boolean,
    required: isRequiredForValidation,
  },
  foreshore_cumulated_length_m: {
    type: Number,
  },
  foreshore_average_width_m: {
    type: Number,
  },
  foreshore_average_thickness_cm: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  additional_info: String,
});

export interface Transect extends mongoose.Document {
  _id: string;
  name: string;
  observation_id: string;
  site_id: string;
  status: string;
  start_pos_latitude: number;
  start_pos_longitude: number;
  end_pos_latitude: number;
  end_pos_longitude: number;
  sifting_trace: boolean;
  motor_access: boolean;
  foreshore_cumulated_length_m: number;
  foreshore_average_width_m: number;
  foreshore_average_thickness_mm: number;
  created_at: Date;
  additional_info: string;
}

export class TransectDTO {
  @ApiModelProperty({ example: '5d9a3ad6f9967419acde0731' })
  _id: string;
  @ApiModelProperty({ example: 'T1' })
  name: string;
  @ApiModelProperty({ example: '2019-10-06T21:18:44.471Z' })
  created_at: Date;
  @ApiModelProperty({ example: '5d987dc90ed4833f3c28072c' })
  observation_id: string;
  @ApiModelProperty({ example: '5d987dc90ed4833f3c28072c' })
  site_id: string;
  @ApiModelProperty({
    enum: ['draft', 'ready', 'current', 'validation_requested', 'validated'],
    example: 'draft',
  })
  status: string;
  @ApiModelProperty({ example: 48.8025884 })
  start_pos_latitude: number;
  @ApiModelProperty({ example: 2.1847466 })
  start_pos_longitude: number;
  @ApiModelProperty({ example: 48.8025884 })
  end_pos_latitude: number;
  @ApiModelProperty({ example: 2.1847466 })
  end_pos_longitude: number;
  @ApiModelProperty({ example: true })
  sifting_trace: boolean;
  @ApiModelProperty({ example: true })
  motor_access: boolean;
  @ApiModelProperty({ example: 21 })
  foreshore_cumulated_length_m: number;
  @ApiModelProperty({ example: 3 })
  foreshore_average_width_m: number;
  @ApiModelProperty({ example: 7 })
  foreshore_average_thickness_cm: number;
  @ApiModelProperty({ example: 'Tout commentaire additionnel sur le transect' })
  additional_info: string;
}
