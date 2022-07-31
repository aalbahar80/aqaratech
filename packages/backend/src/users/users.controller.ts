import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipAbilityCheck } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { ROLE_HEADER } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { UserBasic } from 'src/decorators/user-basic.decorator';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import { UserDto, ValidatedUserDto } from 'src/users/dto/user.dto';
import { UsersService } from './users.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('users')
@ApiTags('users')
@SwaggerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'User' })
  @ApiPaginatedResponse(UserDto)
  findAll() {
    return this.usersService.findAll();
  }

  // Don't check abilities here. This endpoint will return a user's role data,
  // which is necessary to pass ability.guard will be used to determine the user's abilities.
  //
  // This endpoint is hit by users who have just signed in.
  // User will exchange his email (verified by Auth0) for his role data.
  // User will then use role data to set a role header to gain access
  // to endpoints that require an ability check.
  @Get('me')
  @SkipAbilityCheck()
  @ApiOkResponse({ type: ValidatedUserDto })
  @ApiNotFoundResponse()
  findProfile(@UserBasic() user: AuthenticatedUser): Promise<ValidatedUserDto> {
    return this.usersService.findOneByEmail(user.email);
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'User' })
  @ApiOkResponse({ type: ValidatedUserDto })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Promise<ValidatedUserDto> {
    return this.usersService.findOne(id);
  }
}
