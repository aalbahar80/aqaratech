import { subject } from '@casl/ability';
import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CHECK_ABILITY, RequiredRule } from 'src/casl/abilities.decorator';
import { Subject, SubjectName } from 'src/casl/abilities/ability-types';
import { IUser } from 'src/interfaces/user.interface';

/**
 *
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	// eslint-disable-next-line @typescript-eslint/require-await
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		const user = request.user as IUser;

		const rules =
			this.reflector.get<RequiredRule[] | undefined>(
				CHECK_ABILITY,
				context.getHandler(),
			) ?? [];

		const canProceed = rules.every((rule) => {
			const subjectObj = this.contructSubject({
				subjectName: rule.subject,
				params: request.params,
				rule,
				method: request.method,
			});

			return this.isAllowed({ ability: user.ability, rule, subjectObj });
		});

		if (canProceed) {
			return true;
		}

		return false;
	}

	private isAllowed({
		ability,
		rule,
		subjectObj,
	}: {
		ability: IUser['ability'];
		rule: RequiredRule;
		subjectObj: Subject;
	}): boolean {
		const result = ability.can(rule.action, subjectObj);

		if (result) {
			return result;
		} else {
			// this.logger.debug!(
			// 	{
			// 		level: 'debug',
			// 		message: 'Rule failed',
			// 		action: rule.action,
			// 		subject: rule.subject,
			// 	},
			// 	AbilitiesGuard.name,
			// );

			this.logger.warn(
				{
					level: 'warn',
					message: 'Rule failed',
					action: rule.action,
					subjectObj,
				},
				AbilitiesGuard.name,
			);

			return false;
		}
	}

	private contructSubject({
		subjectName,
		params,
		rule,
		method,
	}: {
		subjectName: RequiredRule['subject'];
		params: Request['params'];
		rule: RequiredRule;
		method: string;
	}): Subject | SubjectName {
		if (rule.useParams === undefined && method === 'POST') {
			this.logger.warn(
				'"useParams" is undefined in a POST request. To suppress this warning, explicilty set "useParams" to false',
				AbilitiesGuard.name,
			);
		}

		if (rule.useParams) {
			const subjectProps = this.applyParamOverrides({ rule, params });

			// @ts-expect-error type error
			return subject(subjectName, subjectProps);
		} else {
			return subjectName;
		}
	}

	private applyParamOverrides({
		rule,
		params,
	}: {
		rule: RequiredRule;
		params: Request['params'];
	}): Record<string, string> {
		if (!rule.overrideParams) {
			return params;
		}

		/**
		 * URL parameter map
		 */
		const urlParams = new Map(Object.entries(params));

		const overrides = new Map(Object.entries(rule.overrideParams));

		/**
		 * Props to pass to the subject constructor.
		 */
		const subjectProps = new Map<string, string>();

		urlParams.forEach((value, key) => {
			if (overrides.has(key)) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				subjectProps.set(overrides.get(key)!, value);
			} else {
				subjectProps.set(key, value);
			}
		});

		return Object.fromEntries(subjectProps);
	}
}
