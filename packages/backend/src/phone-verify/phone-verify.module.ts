import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { NovuModule } from 'src/novu/novu.module';

import { PhoneVerifyController } from './phone-verify.controller';
import { PhoneVerifyService } from './phone-verify.service';

@Module({
	imports: [NovuModule, CacheModule.register()],
	controllers: [PhoneVerifyController],
	providers: [PhoneVerifyService],
})
export class PhoneVerifyModule {}
