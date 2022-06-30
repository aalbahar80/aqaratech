import { Module } from '@nestjs/common';
import { UnitsService } from 'src/units/units.service';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, UnitsService],
})
export class PropertiesModule {}
