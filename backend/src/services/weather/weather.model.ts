/* tslint:disable:variable-name */

import { ApiModelProperty } from '@nestjs/swagger';

export interface Weather {
  raw_result: Map<String, any>;
}

export class WeatherDTO {
  @ApiModelProperty({ example: '{ "raw_result" : { "temp" : "21", "maree" : "12" }}' })
  raw_result: Map<String, any>
}
