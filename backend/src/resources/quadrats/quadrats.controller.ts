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
import { ResourceRootController } from '../resource.root.controller'
import { QuadratsService } from './quadrats.service';
import { Quadrat, QuadratDTO } from './quadrat.model';

@ApiUseTags('quadrats')
@Controller('quadrats')
export class QuadratsController extends ResourceRootController {
  constructor(private readonly quadratsService: QuadratsService) {
    super()
  }

  @Post()
  @ApiOperation({ title: 'Create a new quadrat' })
  @ApiResponse({
    status: 201,
    type: QuadratDTO,
    description: 'The record has been successfully created.',
  })
  async addQuadrat(@Body() quadratData: QuadratDTO) {
    const quadratCreated = await this.quadratsService.insertQuadrat(
      quadratData as unknown as Quadrat,
    );
    return quadratCreated;
  }

  @Get(':id')
  @ApiOperation({ title: 'Get a single quadrat' })
  @ApiResponse({
    status: 200,
    type: QuadratDTO,
    description: 'The record has been successfully retrieved',
  })
  getQuadrat(@Param('id') quadratId: string) {
    return this.quadratsService.getSingleQuadrat(quadratId);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update an existing quadrat' })
  @ApiResponse({
    status: 200,
    type: QuadratDTO,
    description: 'The record has been successfully updaated',
  })
  async updateQuadrat(
    @Param('id') quadratId: string,
    @Body() quadratData: QuadratDTO,
  ) {
    const quadrat: Quadrat = await this.quadratsService.updateQuadrat(
      quadratId,
      quadratData as unknown as Quadrat,
    );
    return quadrat;
  }

}
