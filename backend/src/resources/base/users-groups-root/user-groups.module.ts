import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserSchema } from './users/user.model';
import { GroupsController } from './groups/groups.controller';
import { GroupsService } from './groups/groups.service';
import { GroupSchema } from './groups/group.model';

// Dependencies
import { ObservationsModule } from '../observations/observations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    ObservationsModule,
  ],
  exports: [UsersService, GroupsService],
  controllers: [UsersController, GroupsController],
  providers: [UsersService, GroupsService],
})
export class UsersGroupsModule {}
