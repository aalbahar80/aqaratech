import { Module } from '@nestjs/common';
import { PropertiesModule } from 'src/properties/properties.module';
import { PropertiesService } from 'src/properties/properties.service';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService, PropertiesService],
  imports: [PropertiesModule],
})
export class PortfoliosModule {}
