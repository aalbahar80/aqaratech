import { Module } from '@nestjs/common';

import { SearchService } from './search.service';

@Module({
	providers: [SearchService],
	exports: [SearchService], // TODO: Can remove?
})
export class SearchModule {}
