import { Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAbilityCheck } from 'src/auth/public.decorator';
import { AqaratechStaffGuard } from 'src/casl/aqaratech-staff.guard';
import { SearchService } from 'src/search/search.service';

@Controller('search')
@ApiTags('search')
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	// TODO restrict to aqaratech-staff
	@Post('/')
	@SkipAbilityCheck()
	@UseGuards(AqaratechStaffGuard)
	async reindexAll() {
		await this.searchService.remove();
		await this.searchService.init();
	}

	// TODO remove once the onModuleInit is stable
	@Delete('/')
	@SkipAbilityCheck()
	@UseGuards(AqaratechStaffGuard)
	remove() {
		return this.searchService.remove();
	}
}
