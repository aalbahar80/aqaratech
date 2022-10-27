import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { User } from 'src/decorators/user.decorator';
import { RoleCreatedEvent } from 'src/events/role-created.event';
import { IUser } from 'src/interfaces/user.interface';
import { CreateRoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from './roles.service';

@Controller('organizations/:organizationId/roles')
@ApiTags('roles')
export class RolesController {
	constructor(
		private readonly rolesService: RolesService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	@Post()
	@CheckAbilities({ action: Action.Create, subject: 'Role', useParams: true })
	create(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Body() createRoleDto: CreateRoleDto,
	) {
		return this.rolesService.create({
			roleType: 'ORGADMIN',
			organizationId,
			portfolioId: null,
			tenantId: null,
			createRoleDto,
			user,
		});
	}

	@CheckAbilities({ action: Action.Delete, subject: 'Role' })
	@ApiOkResponse({ type: String })
	@Delete(':roleId')
	remove(@Param('roleId') id: string): Promise<string> {
		return this.rolesService.remove(id);
	}

	@CheckAbilities({ action: Action.Manage, subject: 'Role' })
	@Post(':roleId/send-invite')
	sendInvite(@User() user: IUser, @Param('roleId') id: string) {
		this.eventEmitter.emit(
			'role.created',
			new RoleCreatedEvent(id, user.email),
		);
	}
}
