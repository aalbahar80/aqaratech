import { Global, Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Global()
@Module({
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
