import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
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
  @ApiOkResponse({ type: ValidatedUserDto }) // TODO type by hand if needed to add roles
  @ApiNotFoundResponse()
  // TODO validate email qparam
  findOneByEmail(@Query('email') email: string): Promise<ValidatedUserDto> {
    //@ts-ignore
    return this.usersService.findOneByEmail(email);
  }

  @Public() // TODO prod remove
  @Get('profile')
  @ApiOkResponse({ type: ValidatedUserDto }) // TODO type by hand if needed to add roles
  @ApiNotFoundResponse()
  findProfile(@User() user: IUser): Promise<ValidatedUserDto> {
    console.log({ user }, 'users.controller.ts ~ 55');
    //@ts-ignore
    return this.usersService.findOneByEmail(user.email);
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'User' })
  @ApiOkResponse({ type: ValidatedUserDto })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Promise<ValidatedUserDto> {
    // TODO fix type
    //@ts-ignore
    return this.usersService.findOne(id);
  }

  // https://youtu.be/btLyiMUs_Cw?t=424
  // @OnEvent('user.created')
  // implementMe() {}

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
