import { ForbiddenError, subject } from '@casl/ability';
import { Inject, LoggerService } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';
import {
	DueDurationDto,
	UpdateOrganizationSettingsDto,
} from 'src/organizations/dto/organization-settings.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export class OrganizationsSettingsService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}
	SubjectType = 'Organization' as const;

	async findSettings({ id, user }: { id: string; user: IUser }) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Read,
			subject(this.SubjectType, { id }),
		);

		// Returns text (e.g. '1 month 2 days')
		// const dueDuration = await this.prisma.c.$queryRaw(
		// 	Prisma.sql`SELECT "dueDuration"::text FROM "OrganizationSettings" WHERE "OrganizationSettings"."organizationId" = ${id}`,
		// );

		// Returns object (e.g. { months: 1, days: 2 })
		// Cast to int because Interval type is not supported by Prisma
		// https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#unsupported-types
		const dueDurationArr = await this.prisma.c.$queryRaw<DueDurationDto[]>(
			Prisma.sql`SELECT EXTRACT(MONTH FROM "dueDuration")::int AS "months", EXTRACT(DAYS FROM "dueDuration")::int AS "days" FROM "OrganizationSettings" WHERE "OrganizationSettings"."organizationId" = ${id}`,
		);

		// dueDuration needs to be marked as non-null (prisma limitation)
		// https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#unsupported
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const dueDuration = dueDurationArr[0]!;

		const settings = {
			dueDuration,
		};

		return settings;
	}

	async updateSettings({
		id,
		user,
		settings,
	}: {
		id: string;
		user: IUser;
		settings: UpdateOrganizationSettingsDto;
	}) {
		const dueDuration = settings.dueDuration;

		if (!dueDuration) {
			this.logger.debug?.('No dueDuration provided');
			return;
		}

		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { id }),
		);

		// Cast to int because Interval type is not supported by Prisma
		// https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#unsupported-types
		const count = await this.prisma.c
			.$executeRaw`UPDATE "OrganizationSettings" SET "dueDuration" = make_interval(months => ${dueDuration.months}::int, days => ${dueDuration.days}::int) WHERE "OrganizationSettings"."organizationId" = ${id}`;

		return count;
	}
}
