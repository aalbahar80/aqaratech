import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOAuth2,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';

import { UserDto } from 'src/users/dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiOAuth2(['openid', 'profile', 'email'], 'oauth-swagger')
@Controller('users')
@ApiTags('users')
@SwaggerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(UserDto)
  findAll() {
    return this.usersService.findAll();
  }

  @Public() // TODO prod remove
  @Get('by-email')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  // TODO validate email qparam
  findOneByEmail(@Query('email') email: string): Promise<UserDto> {
    return this.usersService.findOneByEmail(email);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // @ApiOkResponse({ type: UserDto })
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

  // @Get(':id/roles')
  // @ApiOkResponse({ type: UserDto })
  // getRoles(@Param('id') id: string) {
  //   return this.usersService.getRoles(id);
  // }
}
