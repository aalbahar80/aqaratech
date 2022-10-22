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
import { Prisma } from '@prisma/client';
import { unitUpdateSchema } from '@self/utils';
import { SkipAbilityCheck } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { LeasesService } from 'src/leases/leases.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { PartialUnitDto, UnitDto, UpdateUnitDto } from 'src/units/dto/unit.dto';
import { UnitsService } from './units.service';

const SubjectType = 'Unit';

@Controller('units')
@ApiTags('units')
@SwaggerAuth()
export class UnitsController {
	constructor(
		private readonly unitsService: UnitsService,
		private leasesService: LeasesService,
	) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiPaginatedResponse(UnitDto)
	findAll(
		@User() user: IUser,
		@Query() pageOptionsDto: PageOptionsDto,
	): Promise<WithCount<UnitDto>> {
		return this.unitsService.findAll({ pageOptionsDto, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: UnitDto })
	findOne(@Param('id') id: string): Promise<UnitDto> {
		return this.unitsService.findOne({ id });
	}

	@Patch(':id')
	@SkipAbilityCheck() // TODO rm
	// TODO: review if PartialUnitDto needed
	@ApiOkResponse({ type: PartialUnitDto })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(unitUpdateSchema))
		updateUnitDto: UpdateUnitDto,
	): Promise<PartialUnitDto> {
		return this.unitsService.update({ id, updateUnitDto, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@Param('id') id: string): Promise<string> {
		return this.unitsService.remove({ id });
	}

	@Get(':id/leases')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'Lease' },
	)
	@ApiPaginatedResponse(LeaseDto)
	findLeases(
		@User() user: IUser,
		@Query() pageOptionsDto: PageOptionsDto,
		@Param('id') id: string,
	): Promise<WithCount<LeaseDto>> {
		const where: Prisma.LeaseWhereInput = { unitId: { equals: id } };
		return this.leasesService.findAll({ user, pageOptionsDto, where });
	}
}
