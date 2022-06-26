import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseDto, UpdateLeaseDto } from 'src/leases/dto/lease.dto';
import { LeasesService } from './leases.service';

@Controller('leases')
@ApiTags('leases')
@SwaggerAuth()
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Lease' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: LeaseDto })
  create(
    @User() user: IUser,
    @Body() createLeaseDto: LeaseDto,
  ): Promise<LeaseDto> {
    return this.leasesService.create({ createLeaseDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Lease' })
  @ApiPaginatedResponse(LeaseDto)
  findAll(
    @User() user: IUser,
    @Query() leasePageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<LeaseDto>> {
    return this.leasesService.findAll({ leasePageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Lease' })
  @ApiOkResponse({ type: LeaseDto })
  findOne(@User() user: IUser, @Param('id') id: string): Promise<LeaseDto> {
    return this.leasesService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Lease' })
  @ApiOkResponse({ type: LeaseDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateLeaseDto: UpdateLeaseDto,
  ): Promise<LeaseDto> {
    return this.leasesService.update({ id, updateLeaseDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Lease' })
  @ApiOkResponse({ type: LeaseDto })
  remove(@User() user: IUser, @Param('id') id: string): Promise<LeaseDto> {
    return this.leasesService.remove({ id, user });
  }
}
