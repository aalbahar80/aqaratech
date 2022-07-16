import { Module } from '@nestjs/common';
import { PropertiesModule } from 'src/properties/properties.module';
import { RolesModule } from 'src/roles/roles.module';
import { UnitsModule } from 'src/units/units.module';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
  exports: [PortfoliosService],
  imports: [RolesModule, PropertiesModule, UnitsModule],
})
export class PortfoliosModule {}
