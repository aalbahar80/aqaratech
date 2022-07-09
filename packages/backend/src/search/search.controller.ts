import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from 'src/search/search.service';

@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/')
  getSearch() {
    return this.searchService.init();
  }

  @Get('/')
  getSearchPost(@Query('query') query: string) {
    return this.searchService.search(query);
  }

  @Delete('/')
  remove() {
    return this.searchService.remove();
  }
}
