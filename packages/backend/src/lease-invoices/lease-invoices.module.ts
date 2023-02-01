import { Module } from '@nestjs/common';

import { MyfatoorahService } from 'src/myfatoorah/myfatoorah.service';
import { PostmarkModule } from 'src/postmark/postmark.module';

import { LeaseInvoicesController } from './lease-invoices.controller';
import { LeaseInvoicesService } from './lease-invoices.service';

@Module({
	controllers: [LeaseInvoicesController],
	providers: [LeaseInvoicesService, MyfatoorahService],
	exports: [LeaseInvoicesService],
	imports: [PostmarkModule],
})
export class LeaseInvoicesModule {}
