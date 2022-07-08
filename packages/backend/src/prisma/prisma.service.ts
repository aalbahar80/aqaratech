import {
  INestApplication,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<{
    rejectOnNotFound: (e: Error) => Error;
    log: Prisma.PrismaClientOptions['log'];
  }>
  implements OnModuleInit
{
  constructor() {
    super({
      rejectOnNotFound(e) {
        throw new NotFoundException(e.message);
      },
      log: ['info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
