import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResourceRootController } from '../../resource.root.controller';

import { TransectsService } from './transects.service';
import { Transect, TransectDTO } from './transect.model';

import { QuadratsService } from '../quadrats/quadrats.service';
import { QuadratDTO } from '../quadrats/quadrat.model';

@ApiUseTags('transects')
@Controller('transects')
export class TransectsController extends ResourceRootController {
  constructor(
    private readonly transectsService: TransectsService,
    private readonly quadratsService: QuadratsService,
  ) {
    super();
  }

  @Post()
  @ApiOperation({ title: 'Create a new transect' })
  @ApiResponse({
    status: 201,
    type: TransectDTO,
    description: 'The record has been successfully created.',
  })
  async addTransect(@Body() transectData: TransectDTO) {
    const transectCreated = await this.transectsService.insertTransect(
      (transectData as unknown) as Transect,
    );
    return transectCreated;
  }

  @Get(':id')
  @ApiOperation({ title: 'Get a single transect' })
  @ApiResponse({
    status: 200,
    type: TransectDTO,
    description: 'The record has been successfully retrieved',
  })
  getTransect(@Param('id') transectId: string) {
    return this.transectsService.getSingleTransect(transectId);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update an existing transect' })
  @ApiResponse({
    status: 200,
    type: TransectDTO,
    description: 'The record has been successfully updaated',
  })
  async updateTransect(
    @Param('id') transectId: string,
    @Body() transectData: TransectDTO,
  ) {
    const transect: Transect = await this.transectsService.updateTransect(
      transectId,
      (transectData as unknown) as Transect,
    );
    return transect;
  }

  @Get(':id/quadrats')
  @ApiOperation({ title: 'List quadrats of a transect' })
  @ApiResponse({
    status: 200,
    type: QuadratDTO,
    isArray: true,
    description: 'Returned list of quadrats (can be none)',
  })
  getTransectQuadrats(@Param('id') transectId: string) {
    return this.quadratsService.getQuadratsByTransect(transectId);
  }
}
