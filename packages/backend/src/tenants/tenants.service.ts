import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Action } from 'src/casl/casl-ability.factory';
import { frisk } from 'src/casl/frisk';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import {
	RemoveDocumentsEvent,
	UpdateIndexEvent,
} from 'src/events/update-index.event';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantSearchDocument } from 'src/tenants/dto/tenant-search-document';
import {
	CreateTenantDto,
	TenantDto,
	UpdateTenantDto,
} from 'src/tenants/dto/tenant.dto';

@Injectable()
export class TenantsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly eventEmitter: EventEmitter2,
	) {}
	SubjectType = 'Tenant' as const;
	IndexName = 'tenant' as const;
	IndexConstructor = TenantSearchDocument;

	async create({
		createTenantDto,
		user,
	}: {
		createTenantDto: CreateTenantDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Create,
			subject(this.SubjectType, createTenantDto),
		);

		const tenant = await this.prisma.tenant.create({ data: createTenantDto });

		this.eventEmitter.emit(
			'update.index',
			new UpdateIndexEvent([tenant], this.IndexName, this.IndexConstructor),
		);

		return new TenantDto(tenant);
	}

	async findAll({
		pageOptionsDto,
		user,
	}: {
		pageOptionsDto: PageOptionsDto;
		user: IUser;
	}): Promise<WithCount<TenantDto>> {
		const { page, take } = pageOptionsDto;

		const [results, total] = await Promise.all([
			this.prisma.tenant.findMany({
				take,
				skip: (page - 1) * take,
				orderBy: { createdAt: 'desc' },
				where: accessibleBy(user.ability).Tenant,
			}),
			this.prisma.tenant.count({
				where: accessibleBy(user.ability).Tenant,
			}),
		]);

		return { total, results: results.map((t) => new TenantDto(t)) };
	}

	async findOne({ id }: { id: string }) {
		const data = await this.prisma.tenant.findUniqueOrThrow({
			where: { id },
			include: {
				leases: {
					select: {
						id: true,
						start: true,
						end: true,
						unit: { select: { id: true, unitNumber: true } },
					},
				},
			},
		});
		return new TenantDto(data);
	}

	async update({
		id,
		updateTenantDto,
		user,
	}: {
		id: string;
		updateTenantDto: UpdateTenantDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, updateTenantDto),
		);

		const frisked = frisk({
			user,
			SubjectType: this.SubjectType,
			instance: updateTenantDto,
		});

		const tenant = await this.prisma.tenant.update({
			where: { id },
			data: frisked,
		});

		this.eventEmitter.emit(
			'update.index',
			new UpdateIndexEvent([tenant], this.IndexName, this.IndexConstructor),
		);

		return new TenantDto(tenant);
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		await this.prisma.tenant.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).Tenant],
			},
		});

		this.eventEmitter.emit(
			'remove.documents',
			new RemoveDocumentsEvent([id], this.IndexName),
		);

		const deleted = await this.prisma.tenant.delete({ where: { id } });

		return new TenantDto(deleted);
	}
}
