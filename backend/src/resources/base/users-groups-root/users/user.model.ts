/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  additional_info: String,
});

export interface User extends mongoose.Document {
  _id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  created_at: Date;
  additional_info: string;
}

export class UserDTO {
  @ApiModelProperty({ example: '5d987dc90ed4833f3c28072c' })
  _id: string;
  @ApiModelProperty({ example: 'Nicolas Vuillamy' })
  name: string;
  @ApiModelProperty({ example: 'lelamaNUL' })
  username: string;
  @ApiModelProperty({ example: 'chouchou56' })
  password: string;
  @ApiModelProperty({ example: 'nicolas.vuillamy@gmail.com' })
  email: string;
  @ApiModelProperty({ example: '2019-10-06T21:18:44.471Z' })
  created_at: Date;
  @ApiModelProperty({
    example: 'Tout commentaire additionnel sur l\'utilisateur',
  })
  additional_info: string;
}
