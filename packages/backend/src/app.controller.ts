import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { AppService } from './app.service';

@Controller()
@SwaggerAuth()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	getHello(): string {
		return 'ok';
	}
}
