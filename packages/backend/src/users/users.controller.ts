import { Controller, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SkipRoleGuard } from 'src/auth/public.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { UserBasic } from 'src/decorators/user-basic.decorator';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import { ValidatedUserDto } from 'src/users/dto/user.dto';

import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@SwaggerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// @Get()
	// @CheckAbilities({ action: Action.Read, subject: 'User' })
	// @ApiPaginatedResponse(UserDto)
	// findAll() {
	//   return this.usersService.findAll();
	// }

	// Don't check abilities here. This endpoint will return a user's role data,
	// which is necessary to pass ability.guard will be used to determine the user's abilities.
	//
	// This endpoint is hit by users who have just signed in.
	// User will exchange his email (verified by Auth0) for his role data.
	// User will then use role data to set a role header to gain access
	// to endpoints that require an ability check.
	@Get('me')
	@SkipRoleGuard()
	@ApiOkResponse({ type: ValidatedUserDto })
	@ApiNotFoundResponse()
	findProfile(@UserBasic() user: AuthenticatedUser): Promise<ValidatedUserDto> {
		return this.usersService.findOneByEmail(user.email);
	}

	// @Get(':id')
	// @CheckAbilities({ action: Action.Read, subject: 'User' })
	// @ApiOkResponse({ type: ValidatedUserDto })
	// @ApiNotFoundResponse()
	// findOne(@Param('id') id: string): Promise<ValidatedUserDto> {
	//   return this.usersService.findOne(id);
	// }
}
