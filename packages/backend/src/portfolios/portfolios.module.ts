import { Module } from '@nestjs/common';
import { PropertiesService } from 'src/properties/properties.service';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService, PropertiesService],
})
export class PortfoliosModule {}
