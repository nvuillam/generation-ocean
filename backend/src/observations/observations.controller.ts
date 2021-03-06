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
import { ObservationsService } from './observations.service';
import { Observation, ObservationDTO } from './observation.model';

@ApiUseTags('observations')
@Controller('observations')
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Post()
  @ApiOperation({ title: 'Create a new observation' })
  @ApiResponse({
    status: 201,
    type: ObservationDTO,
    description: 'The record has been successfully created.',
  })
  async addObservation(@Body() observationData: ObservationDTO) {
    const observationCreated = await this.observationsService.insertObservation(
      observationData as Observation,
    );
    return observationCreated;
  }

  /*    @Get()
    async getAllProducts() {
      const products = await this.productsService.getProducts();
      return products;
    }
  */
  @Get(':id')
  @ApiOperation({ title: 'Get a single observation' })
  @ApiResponse({
    status: 200,
    type: ObservationDTO,
    description: 'The record has been successfully retrieved',
  })
  getObservation(@Param('id') observationId: string) {
    return this.observationsService.getSingleObservation(observationId);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update an existing observation' })
  @ApiResponse({
    status: 200,
    type: ObservationDTO,
    description: 'The record has been successfully updaated',
  })
  async updateObservation(
    @Param('id') observationId: string,
    @Body() observationData: ObservationDTO,
  ) {
    const observation: Observation = await this.observationsService.updateObservation(
      observationId,
      observationData as Observation,
    );
    return observation;
  }
  /*
    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    } */
}
