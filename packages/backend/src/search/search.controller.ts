import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from 'src/search/search.service';

@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/')
  getSearch() {
    const documents = [
      { id: 1, title: 'Carol', genres: ['Romance', 'Drama'] },
      { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
      { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
      {
        id: 4,
        title: 'Mad Max: Fury Road',
        genres: ['Adventure', 'Science Fiction'],
      },
      { id: 5, title: 'Moana', genres: ['Fantasy', 'Action'] },
      { id: 6, title: 'Philadelphia', genres: ['Drama'] },
    ];

    return this.searchService.addDocuments(documents);
  }

  @Get('/')
  getSearchPost(@Query('query') query: string) {
    console.log({ query }, 'search.controller.ts ~ 30');
    return this.searchService.search(query);
  }
}
