import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Field } from '$lib/models/classes/Field.class.js';
import { toDateInput } from '$lib/utils/common.js';
import type { Portfolio as PPortfolio } from '@prisma/client';
import type { CreatePortfolioDto, UpdatePortfolioDto } from '@self/sdk';
import * as R from 'remeda';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/portfolio.schema.js';
import { Entity, type CreateForm, type UpdateForm } from './entity.class.js';

export class Portfolio extends Entity {
	static urlName = 'portfolios' as const;
	static singular = 'portfolio';
	static singularCap = 'Portfolio';
	static plural = 'portfolios';
	static pluralCap = 'Portfolios';
	static schema = baseSchema;

	constructor(
		public data?:
			| InferQueryOutput<'portfolios:basic'>
			| InferQueryOutput<'portfolios:read'>
			| Partial<PPortfolio>
			| InferQueryOutput<'portfolios:list'>['data'][number],
		public urlName = Portfolio.urlName,
		public singular = 'portfolio',
		public singularCap = 'Portfolio',
		public plural = 'portfolios',
		public pluralCap = 'Portfolios',
		public schema = baseSchema,
	) {
		super();
	}

	create = async (info: CreateForm<CreatePortfolioDto>) => {
		const data = await info.api.portfolios.create({
			createPortfolioDto: {
				...info.values,
				organizationId: info.user.role.orgId!,
			},
		});
		return { redirectTo: `/${this.urlName}/${data.id}`, data };
	};

	update = async (form: UpdateForm<UpdatePortfolioDto>) => {
		const data = await form.api.portfolios.update({
			id: form.id,
			updatePortfolioDto: form.values,
		});
		return { redirectTo: `/${this.urlName}/${form.id}`, data };
	};

	defaultForm = (): Record<
		keyof Omit<z.input<typeof baseSchema>, 'id'>,
		any
	> => ({
		fullName: '',
		shortName: '',
		phone: null,
		email: null,
		civilid: null,
		dob: null,
	});

	get basicFields() {
		return [
			new Field('fullName', { required: true, value: this.data?.fullName }),
			new Field('shortName', {
				value: R.pathOr(this.data, ['shortName'], ''),
				hint: 'If a short name is provided, it will be used instead of the full name in the UI.',
			}),
			new Field('email', {
				type: 'email',
				hint: "Once a portfolio's email has been entered, you will be able to send them a portal invitation.",
				value: this.data?.email,
			}),
			new Field('phone', { value: this.data?.phone }),
			new Field('civilid', {
				label: 'Civil ID',
				value: R.pathOr(this.data, ['civilid'], ''),
			}),
			new Field('dob', {
				type: 'date',
				label: 'Date of Birth',
				value: toDateInput(R.pathOr(this.data, ['dob'], '')),
			}),
		];
	}

	public static getLabel = (item: ILabel) => item.shortName || item.fullName;

	override getLabel = () => this.data?.shortName || this.data?.fullName || '';

	static relationalFields = null;
}

interface ILabel {
	fullName: string;
	shortName: string | null;
}
