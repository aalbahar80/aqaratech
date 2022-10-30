import { Module } from '@nestjs/common';
import { AggregateModule } from 'src/aggregate/aggregate.module';
import { PayoutsModule } from 'src/payouts/payouts.module';
import { PortfolioAggregateController } from 'src/portfolios/portfolio-aggregate.controller';
import { PropertiesModule } from 'src/properties/properties.module';
import { RolesModule } from 'src/roles/roles.module';
import { UnitsModule } from 'src/units/units.module';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';

@Module({
	controllers: [PortfoliosController, PortfolioAggregateController],
	providers: [PortfoliosService],
	exports: [PortfoliosService],
	imports: [
		RolesModule,
		PropertiesModule,
		UnitsModule,
		PayoutsModule,
		AggregateModule,
	],
})
export class PortfoliosModule {}
