import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.model';

// Dependencies
import { ObservationsModule } from '../../observations/observations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ObservationsModule,
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
