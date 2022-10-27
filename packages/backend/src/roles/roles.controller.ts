import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { User } from 'src/decorators/user.decorator';
import { RoleCreatedEvent } from 'src/events/role-created.event';
import { IUser } from 'src/interfaces/user.interface';
import { RoleValidationPipe } from 'src/pipes/role-validation.pipe';
import { CreateRoleDto } from 'src/roles/dto/role.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { RolesService } from './roles.service';

@Controller('organizations/:organizationId/roles')
@ApiTags('roles')
export class RolesController {
	constructor(
		private readonly rolesService: RolesService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	@Post()
	// return email string?
	@CheckAbilities({ action: Action.Create, subject: 'Role', useParams: true })
	@ApiCreatedResponse({ type: UserDto })
	create(
		@User() user: IUser,
		@Body(new RoleValidationPipe()) createRoleDto: CreateRoleDto,
	) {
		return this.rolesService.create({ createRoleDto, user });
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
