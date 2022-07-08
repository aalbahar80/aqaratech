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
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import {
  CreateLeaseInvoiceDto,
  LeaseInvoiceBasicDto,
  LeaseInvoiceDto,
  UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from './lease-invoices.service';

@Controller('leaseInvoices')
@ApiTags('leaseInvoices')
@SwaggerAuth()
export class LeaseInvoicesController {
  constructor(private readonly leaseInvoicesService: LeaseInvoicesService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'LeaseInvoice' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: LeaseInvoiceBasicDto })
  create(
    @User() user: IUser,
    @Body() createLeaseInvoiceDto: CreateLeaseInvoiceDto,
  ): Promise<LeaseInvoiceBasicDto> {
    return this.leaseInvoicesService.create({ createLeaseInvoiceDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'LeaseInvoice' })
  @ApiPaginatedResponse(LeaseInvoiceDto)
  findAll(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<WithCount<LeaseInvoiceDto>> {
    return this.leaseInvoicesService.findAll({
      pageOptionsDto,
      user,
    });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'LeaseInvoice' })
  @ApiOkResponse({ type: LeaseInvoiceDto })
  findOne(@Param('id') id: string): Promise<LeaseInvoiceDto> {
    return this.leaseInvoicesService.findOne({ id });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'LeaseInvoice' })
  @ApiOkResponse({ type: LeaseInvoiceBasicDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateLeaseInvoiceDto: UpdateLeaseInvoiceDto,
  ): Promise<LeaseInvoiceBasicDto> {
    return this.leaseInvoicesService.update({
      id,
      updateLeaseInvoiceDto,
      user,
    });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'LeaseInvoice' })
  @ApiOkResponse({ type: LeaseInvoiceBasicDto })
  remove(@Param('id') id: string): Promise<LeaseInvoiceBasicDto> {
    return this.leaseInvoicesService.remove({ id });
  }
}
