import { Global, Module } from '@nestjs/common';
import { TenantsModule } from 'src/tenants/tenants.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Global()
@Module({
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
  imports: [TenantsModule],
})
export class SearchModule {}
