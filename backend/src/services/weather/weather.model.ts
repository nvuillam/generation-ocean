/* tslint:disable:variable-name */

import { ApiModelProperty } from '@nestjs/swagger';

export interface Weather {
  sea_level: number
  raw_results: any;
}

export class WeatherDTO {
  @ApiModelProperty({ example: 1009.93 })
  sea_level: number

  @ApiModelProperty({ example: '{ "raw_results" : { "openweathermap": {"temp" : "21", "maree" : "12" }}}' })
  raw_results: any
}
