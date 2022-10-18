import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';

@Controller()
@SwaggerAuth()
export class AppController {
	@Public()
	@Get('health')
	getHealth(): string {
		return 'ok';
	}
}
