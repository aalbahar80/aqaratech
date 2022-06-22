import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';

import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@SwaggerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'User' })
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'User' })
  @ApiPaginatedResponse(UserDto)
  findAll() {
    return this.usersService.findAll();
  }

  @Public() // TODO prod remove
  @Get('by-email')
  // @CheckAbilities({ action: Action.Read, subject: 'User' })
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  // TODO validate email qparam
  findOneByEmail(@Query('email') email: string): Promise<UserDto> {
    return this.usersService.findOneByEmail(email);
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'User' })
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // @CheckAbilities({ action: Action.Update, subject: 'User' })
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // @CheckAbilities({ action: Action.Delete, subject: 'User' })
  // @ApiOkResponse({ type: UserDto })
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
