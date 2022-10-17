import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class PrismaService
	extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
	implements OnModuleInit
{
	constructor(readonly configService: ConfigService<EnvironmentConfig>) {
		const debug = configService.get('debug.DEBUG_PRISMA', {
			infer: true,
		});
		super({
			log: [...(debug ? ['query'] : ([] as any[])), 'info', 'warn', 'error'],
		});

		if (debug) {
			this.$on('query', (e) => {
				console.log('Query: ' + e.query);
				console.log('Params: ' + e.params);
				console.log(`Duration: ${e.duration}ms`);
			});
		}
	}

	async onModuleInit() {
		await this.$connect();
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async enableShutdownHooks(app: INestApplication) {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}
}
