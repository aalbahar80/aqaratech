import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import {
	ApiQueryOptions,
	QueryParser,
} from 'src/decorators/query-options.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { PayoutDto } from 'src/payouts/dto/payout.dto';
import { PayoutsService } from './payouts.service';

const SubjectType = 'Payout';

@Controller('payouts')
@ApiTags('payouts')
@SwaggerAuth()
export class PayoutsController {
	constructor(private readonly payoutsService: PayoutsService) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiQueryOptions()
	@ApiPaginatedResponse(PayoutDto)
	findAll(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
	): Promise<WithCount<PayoutDto>> {
		return this.payoutsService.findAll({ queryOptions, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: PayoutDto })
	findOne(@User() user: IUser, @Param('id') id: string): Promise<PayoutDto> {
		return this.payoutsService.findOne({ id, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@User() user: IUser, @Param('id') id: string): Promise<string> {
		return this.payoutsService.remove({ id, user });
	}
}
