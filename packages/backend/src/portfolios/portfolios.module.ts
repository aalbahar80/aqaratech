import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService]
})
export class PortfoliosModule {}
