/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;
function isRequiredToBeValid() {
  return this.status != null && ['valid'].includes(this.status);
}

export const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner_user: {
    type: ObjectId,
    ref: 'User',
    required: isRequiredToBeValid,
  },
  status: {
    type: String,
    enum: ['draft', 'valid'],
    default: 'draft',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  additional_info: String,
});

export interface Group extends mongoose.Document {
  _id: string;
  name: string;
  owner_user: string;
  created_at: Date;
  additional_info: string;
}

export class GroupDTO {
  @ApiModelProperty({ example: '5d987dc90ed4833f3c28072c' })
  _id: string;
  @ApiModelProperty({ example: 'Classe de CM2 de l\'école du centre' })
  name: string;
  @ApiModelProperty({ example: 'draft' })
  status: string;
  @ApiModelProperty({ example: '2019-10-06T21:18:44.471Z' })
  created_at: Date;
  @ApiModelProperty({
    example: 'Any additional comment about the group',
  })
  additional_info: string;
}
