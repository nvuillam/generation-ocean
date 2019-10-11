/* tslint:disable:variable-name */

import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginAuthDTO {
  @ApiModelProperty({ example: 'nicolas.vuillamy@gmail.com' })
  username: string;
  @ApiModelProperty({ example: 'chouchou35' })
  password: string;
}
