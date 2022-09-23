import { Module } from '@nestjs/common';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesController } from './leases.controller';
import { LeasesService } from './leases.service';

@Module({
	controllers: [LeasesController],
	providers: [LeasesService],
	exports: [LeasesService],
	imports: [LeaseInvoicesModule],
})
export class LeasesModule {}
