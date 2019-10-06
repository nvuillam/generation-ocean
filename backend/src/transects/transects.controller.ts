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
import { TransectsService } from './transects.service';
import { Transect, TransectDTO } from './transect.model';

@ApiUseTags('transects')
@Controller('transects')
export class TransectsController {
  constructor(private readonly transectsService: TransectsService) {}

  @Post()
  @ApiOperation({ title: 'Create a new transect' })
  @ApiResponse({
    status: 201,
    type: TransectDTO,
    description: 'The record has been successfully created.',
  })
  async addTransect(@Body() transectData: TransectDTO) {
    const transectCreated = await this.transectsService.insertTransect(
      transectData as unknown as Transect,
    );
    return transectCreated;
  }

  /*    @Get()
    async getAllProducts() {
      const products = await this.productsService.getProducts();
      return products;
    }
  */
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
      transectData as unknown as Transect,
    );
    return transect;
  }
  /*
    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    } */
}
