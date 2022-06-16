import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
  imports: [PrismaModule],
})
export class TenantsModule {}
