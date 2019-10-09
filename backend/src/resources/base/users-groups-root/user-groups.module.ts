import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserSchema } from './users/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersGroupsModule { }
