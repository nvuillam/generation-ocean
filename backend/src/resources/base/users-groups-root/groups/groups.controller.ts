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
import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ResourceRootController } from '../../../resource.root.controller';

import { GroupsService } from './groups.service';
import { Group, GroupDTO } from './group.model';

import { ObservationsService } from '../../observations/observations.service';
import { ObservationDTO } from '../../observations/observation.model';

@ApiUseTags('groups')
@UseGuards(AuthGuard('jwt')) // Requires authenticated user to access this resource
@Controller('groups')
export class GroupsController extends ResourceRootController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly observationsService: ObservationsService,
  ) {
    super();
  }

  // Create new group
  @Post()
  @ApiOperation({ title: 'Create a new group' })
  @ApiResponse({
    status: 201,
    type: GroupDTO,
    description: 'The record has been successfully created.',
  })
  async addGroup(@Body() groupData: GroupDTO) {
    const groupCreated = await this.groupsService.insertGroup(
      (groupData as unknown) as Group,
    );
    return groupCreated;
  }

  // Find groups
  @Get()
  @ApiOperation({ title: 'Find groups' })
  @ApiImplicitQuery({
    name: 'name',
    required: false,
    description: 'Name filter',
  })
  @ApiResponse({
    status: 200,
    type: GroupDTO,
    isArray: true,
    description: 'Liste of found groups',
  })
  async getGroups(@Query('name') name: string) {
    const params: { [key: string]: any } = {};
    if (name) {
      params.name = { $regex: new RegExp('.*' + name + '.*', 'i') };
    }
    const groups = await this.groupsService.getGroups(params);
    return groups;
  }

  // Get group info
  @Get(':id')
  @ApiOperation({ title: 'Get a single group' })
  @ApiResponse({
    status: 200,
    type: GroupDTO,
    description: 'The record has been successfully retrieved',
  })
  async getGroup(@Param('id') groupId: string) {
    return this.groupsService.getSingleGroup(groupId);
  }

  // Update group
  @Put(':id')
  @ApiOperation({ title: 'Update an existing group' })
  @ApiResponse({
    status: 200,
    type: GroupDTO,
    description: 'The record has been successfully updaated',
  })
  async updateGroup(@Param('id') groupId: string, @Body() groupData: GroupDTO) {
    const group: Group = await this.groupsService.updateGroup(
      groupId,
      (groupData as unknown) as Group,
    );
    return group;
  }

  // List observations of a group
  @Get(':id/observations')
  @ApiOperation({ title: 'List observations of a group' })
  @ApiResponse({
    status: 200,
    type: ObservationDTO,
    isArray: true,
    description: 'Returned list of observations (can be none)',
  })
  getGroupObservations(@Param('id') groupId: string) {
    return this.observationsService.getObservationsByGroup(groupId);
  }
}
