import { ForbiddenError, subject } from '@casl/ability';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { RoleValidationPipe } from 'src/pipes/role-validation.pipe';
import { CreateRoleDto } from 'src/roles/dto/role.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  // return email string?
  @CheckAbilities({ action: Action.Create, subject: 'Role' })
  @ApiOkResponse({ type: UserDto })
  create(
    @User() user: IUser,
    @Body(new RoleValidationPipe()) createRoleDto: CreateRoleDto,
  ) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('Role', createRoleDto),
    );
    return this.rolesService.create(createRoleDto);
  }

  @CheckAbilities({ action: Action.Delete, subject: 'Role' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
