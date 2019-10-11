import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ResourceRootController } from '../../resource.root.controller';

import { AlguaeDescriptionsService } from './alguae-descriptions.service';
import {
  AlguaeDescription,
  AlguaeDescriptionDTO,
} from './alguae-description.model';

@ApiUseTags('alguae-descriptions')
@UseGuards(AuthGuard('jwt')) // Requires authenticated user to access this resource
@Controller('ref/alguae-descriptions')
export class AlguaeDescriptionsController extends ResourceRootController {
  constructor(
    private readonly alguaeDescriptionsService: AlguaeDescriptionsService,
  ) {
    super();
  }

  @Get()
  @ApiOperation({ title: 'Find Alguae Descriptions' })
  @ApiImplicitQuery({
    name: 'name',
    required: false,
    description: 'Name filter',
  })
  @ApiResponse({
    status: 200,
    type: AlguaeDescriptionDTO,
    isArray: true,
    description: 'Liste of found Alguae Descriptions',
  })
  async getAlguaeDescriptions(@Query('name') name: string) {
    const params: { [key: string]: any } = {};
    if (name) {
      params.name = { $regex: new RegExp('.*' + name + '.*', 'i') };
    }
    const alguaeDescriptions = await this.alguaeDescriptionsService.getAlguaeDescriptions(
      params,
    );
    return alguaeDescriptions;
  }

  @Get(':id')
  @ApiOperation({ title: 'Get a single alguae-description' })
  @ApiResponse({
    status: 200,
    type: AlguaeDescriptionDTO,
    description: 'The record has been successfully retrieved',
  })
  async getAlguaeDescription(@Param('id') alguaeDescriptionId: string) {
    return this.alguaeDescriptionsService.getSingleAlguaeDescription(
      alguaeDescriptionId,
    );
  }
}
