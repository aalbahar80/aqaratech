import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { roleCreateSchema } from '@self/utils';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { User } from 'src/decorators/user.decorator';
import { RoleCreatedEvent } from 'src/events/role-created.event';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateRoleDto, RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from './roles.service';

@Controller('organizations/:organizationId')
@ApiTags('roles')
export class RolesController {
	constructor(
		private readonly rolesService: RolesService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	@Post('roles')
	@CheckAbilities({ action: Action.Create, subject: 'Role', useParams: true })
	createOrgAdminRole(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(roleCreateSchema))
		createRoleDto: CreateRoleDto,
	): Promise<RoleDto> {
		return this.rolesService.create({
			roleType: 'ORGADMIN',
			organizationId,
			portfolioId: null,
			tenantId: null,
			createRoleDto,
			user,
		});
	}

	@Post('portfolios/:portfolioId/roles')
	@CheckAbilities({ action: Action.Create, subject: 'Role', useParams: true })
	createPortfolioRole(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Param('portfolioId') portfolioId: string,
		@Body(new ZodValidationPipe(roleCreateSchema))
		createRoleDto: CreateRoleDto,
	): Promise<RoleDto> {
		return this.rolesService.create({
			roleType: 'PORTFOLIO',
			organizationId,
			portfolioId,
			tenantId: null,
			createRoleDto,
			user,
		});
	}

	@Post('tenants/:tenantId/roles')
	@CheckAbilities({ action: Action.Create, subject: 'Role', useParams: true })
	createTenantRole(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Param('tenantId') tenantId: string,
		@Body(new ZodValidationPipe(roleCreateSchema))
		createRoleDto: CreateRoleDto,
	): Promise<RoleDto> {
		return this.rolesService.create({
			roleType: 'TENANT',
			organizationId,
			portfolioId: null,
			tenantId,
			createRoleDto,
			user,
		});
	}

	@CheckAbilities({ action: Action.Delete, subject: 'Role', useParams: true })
	@Delete('roles/:roleId')
	remove(@Param('roleId') id: string): Promise<string> {
		return this.rolesService.remove(id);
	}

	@CheckAbilities({ action: Action.Create, subject: 'Role', useParams: true })
	@Post('roles/:roleId/send-invite')
	sendInvite(@User() user: IUser, @Param('roleId') id: string) {
		this.eventEmitter.emit(
			'role.created',
			new RoleCreatedEvent(id, user.email),
		);
	}
}
