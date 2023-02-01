import { Controller, Get, NotFoundException } from '@nestjs/common';

import { isLiveEnv } from '@self/utils';
import { Public } from 'src/auth/public.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';

import { AppService } from './app.service';

@Controller()
@SwaggerAuth()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get('health')
	getHealth(): string {
		return 'ok';
	}

	@Public()
	@Get('aq-config')
	getConfig() {
		const config = this.appService.getConfig();

		if (isLiveEnv(config.PUBLIC_AQARATECH_ENV)) {
			throw new NotFoundException();
		}

		return config;
	}
}
