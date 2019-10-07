import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { TransectsController } from './transects.controller';
import { TransectsService } from './transects.service';
import { TransectSchema } from './transect.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transect', schema: TransectSchema },
    ]),
  ],
  exports: [TransectsService],
  controllers: [TransectsController],
  providers: [TransectsService],
})
export class TransectsModule { }