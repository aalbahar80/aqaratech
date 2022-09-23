import { Module } from '@nestjs/common';
import { UnitsModule } from 'src/units/units.module';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

@Module({
	controllers: [PropertiesController],
	providers: [PropertiesService],
	exports: [PropertiesService],
	imports: [UnitsModule],
})
export class PropertiesModule {}
