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
import { ResourceRootController } from '../../../resource.root.controller';

import { UsersService } from './users.service';
import { User, UserDTO } from './user.model';

import { ObservationsService } from '../../observations/observations.service';
import { ObservationDTO } from '../../observations/observation.model';

@ApiUseTags('users')
@Controller('users')
export class UsersController extends ResourceRootController {
  constructor(
    private readonly usersService: UsersService,
    private readonly observationsService: ObservationsService,
  ) {
    super();
  }

  @Post()
  @ApiOperation({ title: 'Create a new user' })
  @ApiResponse({
    status: 201,
    type: UserDTO,
    description: 'The record has been successfully created.',
  })
  async addUser(@Body() userData: UserDTO) {
    const userCreated = await this.usersService.insertUser(userData as User);
    return userCreated;
  }

  @Get()
  @ApiOperation({ title: 'Find users' })
  @ApiImplicitQuery({
    name: 'name',
    required: false,
    description: 'Name filter',
  })
  @ApiResponse({
    status: 200,
    type: UserDTO,
    isArray: true,
    description: 'Liste of found users',
  })
  async getUsers(@Query('name') name: string) {
    const params: { [key: string]: any } = {};
    if (name) {
      params.name = { $regex: '.*' + name + '.*' };
    }
    const users = await this.usersService.getUsers(params);
    return users;
  }

  @Get(':id')
  @ApiOperation({ title: 'Get a single user' })
  @ApiResponse({
    status: 200,
    type: UserDTO,
    description: 'The record has been successfully retrieved',
  })
  async getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update an existing user' })
  @ApiResponse({
    status: 200,
    type: UserDTO,
    description: 'The record has been successfully updaated',
  })
  async updateUser(@Param('id') userId: string, @Body() userData: UserDTO) {
    const user: User = await this.usersService.updateUser(
      userId,
      userData as User,
    );
    return user;
  }

  @Get(':id/observations')
  @ApiOperation({ title: 'List observations of a user' })
  @ApiResponse({
    status: 200,
    type: ObservationDTO,
    isArray: true,
    description: 'Returned list of observations (can be none)',
  })
  getUserObservations(@Param('id') userId: string) {
    return this.observationsService.getObservationsByUser(userId);
  }
}
