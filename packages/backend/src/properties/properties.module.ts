import { Module } from '@nestjs/common';
import { UnitsModule } from 'src/units/units.module';
import { UnitsService } from 'src/units/units.service';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, UnitsService],
  imports: [UnitsModule],
  exports: [UnitsModule],
})
export class PropertiesModule {}
