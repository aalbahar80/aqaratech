import { Controller, Delete, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ROLE_HEADER } from 'src/constants/header-role';
import { SearchService } from 'src/search/search.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // TODO restrict to aqaratech-staff
  @Post('/')
  async reindexAll() {
    await this.searchService.remove();
    await this.searchService.init();
  }

  // TODO remove once the onModuleInit is stable
  @Delete('/')
  remove() {
    return this.searchService.remove();
  }
}
