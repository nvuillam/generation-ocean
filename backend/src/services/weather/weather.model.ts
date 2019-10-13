/* tslint:disable:variable-name */

import { ApiModelProperty } from '@nestjs/swagger';

export interface Weather {
  sea_level: number;
  sea_surface_temperature: number;
  swell_height: number;
  swell_direction: number;
  current_eastward: number;
  current_northward: number;
  current_direction: number;
  current_speed: number;
  tide_coef: number;
  tide_time: string;
  raw_results: any;
}

export class WeatherDTO {
  @ApiModelProperty({ example: 1009.93 })
  sea_level: number;
  @ApiModelProperty({ example: 47.93 })
  sea_surface_temperature: number;
  @ApiModelProperty({ example: 47.93 })
  swell_height: number;
  @ApiModelProperty({ example: 47.93 })
  swell_direction: number;
  @ApiModelProperty({ example: 47.93 })
  current_eastward: number;
  @ApiModelProperty({ example: 47.93 })
  current_northward: number;
  @ApiModelProperty({ example: 47.93 })
  current_direction: number;
  @ApiModelProperty({ example: 47.93 })
  current_speed: number;
  @ApiModelProperty({ example: 85 })
  tide_coef: number;
  @ApiModelProperty({ example: 'PM-3H' })
  tide_time: string;
  @ApiModelProperty({ example: { openweathermap: { xxxx: 1234 } } })
  raw_results: any;
}
