import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

import { CaslModule } from 'src/casl/casl.module';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
  imports: [CaslModule],
})
export class TenantsModule {}
