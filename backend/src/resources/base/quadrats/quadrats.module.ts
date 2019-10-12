import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Current module
import { QuadratsController } from './quadrats.controller';
import { QuadratsService } from './quadrats.service';
import { QuadratSchema } from './quadrat.model';

// Dependencies
import { AlguaeDescriptionsModule } from '../../ref/alguae-descriptions/alguae-descriptions.module';
import { WeatherModule } from '../../../services/weather/weather.module';
import { SitesModule } from '../sites/sites.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quadrat', schema: QuadratSchema }]),
    SitesModule,
    AlguaeDescriptionsModule,
    WeatherModule,
  ],
  exports: [QuadratsService],
  controllers: [QuadratsController],
  providers: [QuadratsService],
})
export class QuadratsModule {}
