import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

import { CaslModule } from 'src/casl/casl.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
  imports: [PrismaModule, CaslModule],
})
export class TenantsModule {}
