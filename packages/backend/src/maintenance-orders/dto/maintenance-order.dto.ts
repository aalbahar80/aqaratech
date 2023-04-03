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
	MaintenanceOrderStatus,
} from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
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
	status: MaintenanceOrderStatus | null;

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
				id: this.portfolioId,
				title: this.portfolio.title,
			}),
		};

		if (this.property) {
			crumbs.property = new BreadcrumbDto({
				id: this.property.id,
				title: this.property.title,
			});
		}

		if (this.unit) {
			crumbs.unit = new BreadcrumbDto({
				id: this.unit.id,
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				title: this.unit.computed!.title,
			});
		}

		if (this.tenant) {
			crumbs.tenant = new BreadcrumbDto({
				id: this.tenant.id,
				title: this.tenant.title,
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
	status?: MaintenanceOrderStatus | null;
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
