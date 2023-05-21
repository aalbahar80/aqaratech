import { Injectable } from '@nestjs/common';
import tier from 'tier';

import { tierid } from '@self/utils';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class TierService {
	constructor(private readonly env: EnvService) {}

	async subscribe({
		organization,
		user,
	}: {
		organization: { id: string; fullName: string };
		user: { email: string };
	}) {
		await tier.subscribe(
			tierid(organization.id),
			this.env.e.PUBLIC_TIER_PLAN_ID_2,
			{
				trialDays: 90,
				info: {
					name: organization.fullName,
					email: user.email,
					phone: '',
					description: '',
					metadata: {},
				},
			},
		);
	}
}
