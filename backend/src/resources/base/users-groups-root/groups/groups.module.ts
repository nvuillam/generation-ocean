import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupSchema } from './group.model';

// Dependencies
import { ObservationsModule } from '../../observations/observations.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    forwardRef(() => UsersModule),
    ObservationsModule,
  ],
  exports: [GroupsService],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
