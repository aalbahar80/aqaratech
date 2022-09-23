import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/casl-ability.factory';
import { frisk } from 'src/casl/frisk';
import { crumbs } from 'src/common/breadcrumb-select';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import {
	RemoveDocumentsEvent,
	UpdateIndexEvent,
} from 'src/events/update-index.event';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertySearchDocument } from 'src/properties/dto/property-search-document';
import {
	CreatePropertyDto,
	PropertyDto,
	UpdatePropertyDto,
} from 'src/properties/dto/property.dto';

@Injectable()
export class PropertiesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly eventEmitter: EventEmitter2,
	) {}
	SubjectType = 'Property' as const;
	IndexName = 'property' as const;
	IndexConstructor = PropertySearchDocument;

	async create({
		createPropertyDto,
		user,
	}: {
		createPropertyDto: CreatePropertyDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Create,
			subject(this.SubjectType, createPropertyDto),
		);

		const created = await this.prisma.property.create({
			data: createPropertyDto,
		});
		const property = new PropertyDto(created);

		this.eventEmitter.emit(
			'update.index',
			new UpdateIndexEvent([property], this.IndexName, this.IndexConstructor),
		);

		return property;
	}

	async findAll({
		pageOptionsDto,
		user,
		where,
	}: {
		pageOptionsDto: PageOptionsDto;
		user: IUser;
		where?: Prisma.PropertyWhereInput;
	}): Promise<WithCount<PropertyDto>> {
		const { page, take } = pageOptionsDto;

		const filter: Prisma.PropertyWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).Property,
				...(where ? [where] : []),
			],
		};

		const [results, total] = await Promise.all([
			this.prisma.property.findMany({
				take,
				skip: (page - 1) * take,
				orderBy: { createdAt: 'desc' },
				where: filter,
				include: { portfolio: crumbs.portfolio },
			}),
			this.prisma.property.count({ where: filter }),
		]);

		return { total, results: results.map((p) => new PropertyDto(p)) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const property = await this.prisma.property.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Read).Property],
			},
			include: { portfolio: crumbs.portfolio },
		});

		return new PropertyDto(property);
	}

	async update({
		id,
		updatePropertyDto,
		user,
	}: {
		id: string;
		updatePropertyDto: UpdatePropertyDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, updatePropertyDto),
		);

		const frisked = frisk({
			user,
			SubjectType: this.SubjectType,
			instance: updatePropertyDto,
		});

		const updated = await this.prisma.property.update({
			where: { id },
			data: frisked,
		});
		const property = new PropertyDto(updated);

		this.eventEmitter.emit(
			'update.index',
			new UpdateIndexEvent([property], this.IndexName, this.IndexConstructor),
		);

		return property;
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		await this.prisma.property.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).Property],
			},
		});

		this.eventEmitter.emit(
			'remove.documents',
			new RemoveDocumentsEvent([id], this.IndexName),
		);

		const deleted = await this.prisma.property.delete({ where: { id } });

		return new PropertyDto(deleted);
	}
}
