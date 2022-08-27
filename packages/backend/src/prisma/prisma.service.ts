import {
  INestApplication,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class PrismaService
  extends PrismaClient<{
    rejectOnNotFound: (e: Error) => Error;
    log: Prisma.PrismaClientOptions['log'];
  }>
  implements OnModuleInit
{
  constructor(readonly configService: ConfigService<EnvironmentConfig>) {
    const debug = configService.get('debug.DEBUG_PRISMA', {
      infer: true,
    });
    super({
      rejectOnNotFound(e) {
        throw new NotFoundException(e.message);
      },
      log: [...(debug ? ['query'] : ([] as any[])), 'info', 'warn', 'error'],
    });

    if (debug) {
      // @ts-ignore
      this.$on('query', (e) => {
        // @ts-ignore
        console.log('Query: ' + e.query);
        // @ts-ignore
        console.log('Params: ' + e.params);
        // @ts-ignore
        console.log('Duration: ' + e.duration + 'ms');
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
