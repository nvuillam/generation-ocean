import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ResourceRootController } from '../../resource.root.controller';

import { SitesService } from './sites.service';
import { Site, SiteDTO } from './site.model';

import { ObservationsService } from '../observations/observations.service';
import { ObservationDTO } from '../observations/observation.model';

@ApiUseTags('sites')
@Controller('sites')
export class SitesController extends ResourceRootController {
  constructor(
    private readonly sitesService: SitesService,
    private readonly observationsService: ObservationsService,
  ) {
    super();
  }

  @Post()
  @ApiOperation({ title: 'Create a new site' })
  @ApiResponse({
    status: 201,
    type: SiteDTO,
    description: 'The record has been successfully created.',
  })
  async addSite(@Body() siteData: SiteDTO) {
    const siteCreated = await this.sitesService.insertSite(siteData as Site);
    return siteCreated;
  }

  @Get()
  @ApiOperation({ title: 'Find sites' })
  @ApiImplicitQuery({
    name: 'name',
    required: false,
    description: 'Name filter',
  })
  @ApiResponse({
    status: 200,
    type: SiteDTO,
    isArray: true,
    description: 'Liste of found sites',
  })
  async getSites(@Query('name') name: string) {
    const params: { [key: string]: any } = {};
    if (name) {
      params.name = { $regex: new RegExp('.*' + name + '.*', 'i') };
    }
    const sites = await this.sitesService.getSites(params);
    return sites;
  }

  @Get(':id')
  @ApiOperation({ title: 'Get a single site' })
  @ApiResponse({
    status: 200,
    type: SiteDTO,
    description: 'The record has been successfully retrieved',
  })
  async getSite(@Param('id') siteId: string) {
    return this.sitesService.getSingleSite(siteId);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update an existing site' })
  @ApiResponse({
    status: 200,
    type: SiteDTO,
    description: 'The record has been successfully updaated',
  })
  async updateSite(@Param('id') siteId: string, @Body() siteData: SiteDTO) {
    const site: Site = await this.sitesService.updateSite(
      siteId,
      siteData as Site,
    );
    return site;
  }
  /*
    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    } */

  @Get(':id/observations')
  @ApiOperation({ title: 'List observations of a site' })
  @ApiResponse({
    status: 200,
    type: ObservationDTO,
    isArray: true,
    description: 'Returned list of observations (can be none)',
  })
  getSiteTransects(@Param('id') siteId: string) {
    return this.observationsService.getObservationsBySite(siteId);
  }
}
