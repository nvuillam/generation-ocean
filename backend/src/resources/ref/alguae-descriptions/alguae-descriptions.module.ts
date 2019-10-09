import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { AlguaeDescriptionsController } from './alguae-descriptions.controller';
import { AlguaeDescriptionsService } from './alguae-descriptions.service';
import { AlguaeDescriptionSchema } from './alguae-description.model';
import { AlguaeAnalysisSchema } from './alguae-analysis.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AlguaeDescription', schema: AlguaeDescriptionSchema },
      { name: 'AlguaeAnalysisSchema', schema: AlguaeAnalysisSchema },
    ]),
  ],
  exports: [AlguaeDescriptionsService],
  controllers: [AlguaeDescriptionsController],
  providers: [AlguaeDescriptionsService],
})
export class AlguaeDescriptionsModule {}
