import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { QuadratsController } from './quadrats.controller';
import { QuadratsService } from './quadrats.service';
import { QuadratSchema } from './quadrat.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quadrat', schema: QuadratSchema }]),
  ],
  exports: [QuadratsService],
  controllers: [QuadratsController],
  providers: [QuadratsService],
})
export class QuadratsModule {}
