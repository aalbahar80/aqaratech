import {
	ApiHideProperty,
	ApiProperty,
	ApiPropertyOptional,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import {
	MaintenanceOrderCreateSchema,
	MaintenanceOrderUpdateSchema,
	MAINTENANCE_ORDER_STATUS,
} from '@self/utils';

import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
import { Exactly } from 'src/types/exactly.type';

class MaintenanceOrderBreadcrumbsDto extends IntersectionType(
	PickType(BreadcrumbsDto, ['portfolio']),
	PartialType(PickType(BreadcrumbsDto, ['property', 'unit', 'tenant'])),
) {}

export class MaintenanceOrderDto
	extends AbstractDto
	implements Exactly<MaintenanceOrderCreateSchema, CreateMaintenanceOrderDto>
{
	portfolioId: string;
	propertyId: string | null;
	unitId: string | null;
	tenantId: string | null;
	completedAt: string | null;
	title: string | null;
	description: string | null;
	@ApiProperty({
		enum: MAINTENANCE_ORDER_STATUS,
		enumName: 'MAINTENANCE_ORDER_STATUS_ENUM',
	})
	status: typeof MAINTENANCE_ORDER_STATUS[number] | null;

	organizationId: string;

	@ApiHideProperty()
	@Exclude({ toPlainOnly: true })
	portfolio: IBreadcrumbs['portfolio'];

	@ApiHideProperty()
	@Exclude({ toPlainOnly: true })
	property: IBreadcrumbs['property'] | null;

	@ApiHideProperty()
	@Exclude({ toPlainOnly: true })
	unit: IBreadcrumbs['unit'] | null;

	@ApiHideProperty()
	@Exclude({ toPlainOnly: true })
	tenant: IBreadcrumbs['tenant'] | null;

	@ApiProperty()
	@Expose()
	get breadcrumbs(): MaintenanceOrderBreadcrumbsDto {
		const crumbs: MaintenanceOrderBreadcrumbsDto = {
			portfolio: new BreadcrumbDto({
				rel: Rel.Portfolio,
				...this.portfolio,
			}),
		};

		if (this.property) {
			crumbs.property = new BreadcrumbDto({
				rel: Rel.Property,
				...this.property,
			});
		}

		if (this.unit) {
			crumbs.unit = new BreadcrumbDto({
				rel: Rel.Unit,
				...this.unit,
			});
		}

		if (this.tenant) {
			crumbs.tenant = new BreadcrumbDto({
				rel: Rel.Tenant,
				...this.tenant,
			});
		}

		return crumbs;
	}
}

export class CreateMaintenanceOrderDto
	implements Exactly<MaintenanceOrderCreateSchema, CreateMaintenanceOrderDto>
{
	portfolioId: string;
	propertyId: string | null;
	unitId: string | null;
	tenantId: string | null;
	completedAt?: string | null;
	title?: string | null;
	description?: string | null;
	@ApiPropertyOptional({
		enum: MAINTENANCE_ORDER_STATUS,
		enumName: 'MAINTENANCE_ORDER_STATUS_ENUM',
		nullable: true,
	})
	status?: typeof MAINTENANCE_ORDER_STATUS[number] | null;
}

export class UpdateMaintenanceOrderDto
	extends PartialType(
		OmitType(CreateMaintenanceOrderDto, [
			'portfolioId',
			'propertyId',
			'unitId',
			'tenantId',
		]),
	)
	implements Exactly<MaintenanceOrderUpdateSchema, UpdateMaintenanceOrderDto> {}
