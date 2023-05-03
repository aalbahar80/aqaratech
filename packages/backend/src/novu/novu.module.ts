import { Module } from '@nestjs/common';

import { NovuService } from './novu.service';

@Module({
	providers: [NovuService],
	exports: [NovuService],
})
export class NovuModule {}
