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
import { WithCount } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
import {
  CreateLeaseInvoiceDto,
  LeaseInvoiceDto,
  UpdateLeaseInvoiceDto,
} from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from './lease-invoices.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('leaseInvoices')
@ApiTags('leaseInvoices')
@SwaggerAuth()
export class LeaseInvoicesController {
  constructor(private readonly leaseInvoicesService: LeaseInvoicesService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'LeaseInvoice' })
  @ApiCreatedResponse({ type: String })
  create(
    @User() user: IUser,
    @Body() createLeaseInvoiceDto: CreateLeaseInvoiceDto,
  ): Promise<string> {
    return this.leaseInvoicesService.create({ createLeaseInvoiceDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'LeaseInvoice' })
  @ApiPaginatedResponse(LeaseInvoiceDto)
  findAll(
    @User() user: IUser,
    @Query() pageOptionsDto: LeaseInvoiceOptionsDto,
  ): Promise<WithCount<LeaseInvoiceDto>> {
    return this.leaseInvoicesService.findAll({ pageOptionsDto, user });
  }

  @Get(':id')
  @ApiOkResponse({ type: LeaseInvoiceDto })
  findOne(
    @Param('id') id: string,
    @User() user: IUser,
  ): Promise<LeaseInvoiceDto> {
    return this.leaseInvoicesService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'LeaseInvoice' })
  @ApiOkResponse({ type: String })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateLeaseInvoiceDto: UpdateLeaseInvoiceDto,
  ): Promise<string> {
    return this.leaseInvoicesService.update({
      id,
      updateLeaseInvoiceDto,
      user,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: String })
  remove(@Param('id') id: string, @User() user: IUser): Promise<string> {
    return this.leaseInvoicesService.remove({ id, user });
  }

  @Post('/:id/send-email')
  sendEmail(@Param('id') id: string, @User() user: IUser) {
    return this.leaseInvoicesService.sendInvoice({ id, user });
  }
}
