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
import { QuadratsService } from './quadrats.service';
import { Quadrat, QuadratDTO } from './quadrat.model';
import {
  AlguaeAnalysis,
  AlguaeAnalysisDTO,
} from '../../ref/alguae-descriptions/alguae-analysis.model';

@ApiUseTags('quadrats')
@Controller('quadrats')
export class QuadratsController extends ResourceRootController {
  constructor(private readonly quadratsService: QuadratsService) {
    super();
  }

  // Create new Quadrat
  @Post()
  @ApiOperation({ title: 'Create a new quadrat' })
  @ApiResponse({
    status: 201,
    type: QuadratDTO,
    description: 'The record has been successfully created.',
  })
  async addQuadrat(@Body() quadratData: QuadratDTO) {
    const quadratCreated = await this.quadratsService.insertQuadrat(
      (quadratData as unknown) as Quadrat,
    );
    return quadratCreated;
  }

  // Get Quadrat data
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

  // Update an existing Quadrat
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
      (quadratData as unknown) as Quadrat,
    );
    return quadrat;
  }

  // List alguaes of a Quadrat
  @Get(':id/alguaes')
  @ApiOperation({ title: 'Get list of alguaes recorded on a quadrat' })
  @ApiResponse({
    status: 200,
    type: AlguaeAnalysisDTO,
    isArray: true,
    description: 'The record has been successfully retrieved',
  })
  getQuadratAlguaes(@Param('id') quadratId: string) {
    return this.quadratsService.getSingleQuadratAlguaes(quadratId);
  }

  // Upsert alguae analysis in quadrat alguaes list
  @Post(':id/alguaes/:alguaeCode')
  @ApiOperation({ title: 'Post a new alguae analysis on a quadrat' })
  @ApiResponse({
    status: 200,
    type: AlguaeAnalysisDTO,
    isArray: true,
    description: 'The record has been successfully updated',
  })
  updateQuadratAlguae(
    @Param('id') quadratId: string,
    @Param('alguaeCode') alguaeCode: string,
    @Body() alguaeAnalysis: AlguaeAnalysisDTO,
  ) {
    return this.quadratsService.updateQuadratUpsertAlguaeAnalysis(
      quadratId,
      alguaeCode,
      alguaeAnalysis,
    );
  }
}
