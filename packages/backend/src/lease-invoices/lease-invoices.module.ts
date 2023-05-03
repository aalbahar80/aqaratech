import { Module } from '@nestjs/common';

import { MyfatoorahService } from 'src/myfatoorah/myfatoorah.service';
import { NovuModule } from 'src/novu/novu.module';
import { PostmarkModule } from 'src/postmark/postmark.module';

import { LeaseInvoicesController } from './lease-invoices.controller';
import { LeaseInvoicesService } from './lease-invoices.service';

@Module({
	controllers: [LeaseInvoicesController],
	providers: [LeaseInvoicesService, MyfatoorahService],
	exports: [LeaseInvoicesService],
	imports: [PostmarkModule, NovuModule],
})
export class LeaseInvoicesModule {}
