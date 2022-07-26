import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { ROLE_HEADER } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
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

  @Get('me')
  @CheckAbilities({ action: Action.Read, subject: 'User' })
  @ApiOkResponse({ type: ValidatedUserDto })
  @ApiNotFoundResponse()
  findProfile(@User() user: IUser): Promise<ValidatedUserDto> {
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
