import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { PayoutDto, UpdatePayoutDto } from 'src/payouts/dto/payout.dto';
import { PayoutsService } from './payouts.service';

const SubjectType = 'Payout';

@Controller('payouts')
@ApiTags('payouts')
@SwaggerAuth()
export class PayoutsController {
	constructor(private readonly payoutsService: PayoutsService) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiPaginatedResponse(PayoutDto)
	findAll(
		@User() user: IUser,
		@Query() pageOptionsDto: PageOptionsDto,
	): Promise<WithCount<PayoutDto>> {
		return this.payoutsService.findAll({ pageOptionsDto, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: PayoutDto })
	findOne(@User() user: IUser, @Param('id') id: string): Promise<PayoutDto> {
		return this.payoutsService.findOne({ id, user });
	}

	@Patch(':id')
	@CheckAbilities({ action: Action.Update, subject: SubjectType })
	@ApiOkResponse({ type: PayoutDto })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body() updatePayoutDto: UpdatePayoutDto,
	): Promise<PayoutDto> {
		return this.payoutsService.update({ id, updatePayoutDto, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@User() user: IUser, @Param('id') id: string): Promise<string> {
		return this.payoutsService.remove({ id, user });
	}
}
