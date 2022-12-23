import { Global, Module } from '@nestjs/common';

import { EnvService } from './env.service';

@Global()
@Module({
	providers: [EnvService],
})
export class EnvModule {}
