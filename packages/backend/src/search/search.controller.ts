import { Controller, Delete, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ROLE_HEADER } from 'src/constants/header-role';
import { SearchService } from 'src/search/search.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/')
  initSearch() {
    return this.searchService.init();
  }

  @Delete('/')
  remove() {
    return this.searchService.remove();
  }
}
