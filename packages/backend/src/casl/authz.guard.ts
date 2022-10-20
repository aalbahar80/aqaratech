import { subject } from '@casl/ability';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CHECK_ABILITY, RequiredRule } from 'src/casl/abilities.decorator';
import { IUser } from 'src/interfaces/user.interface';

// this guard needs
// user.ability - done
// Action type
// subject (subjectType, subjectObject)

@Injectable()
export class AuthzGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const metadata = this.reflector.get<RequiredRule[] | undefined>(
			CHECK_ABILITY,
			context.getHandler(),
		);

		// TODO: throw if more than one rule is provided
		if (metadata && metadata.length > 1) {
			throw new Error('Multiple rules are not supported');
		}

		const rule = metadata![0];

		const handler = context.getHandler();
		// const args = handler.arguments;

		const methodKey = context.getHandler().name;

		const className = context.getClass().name;

		const request = context.switchToHttp().getRequest<Request>();

		const user = request.user as IUser;

		const subjectObject = request.body;

		// @ts-ignore
		const orgIdFromUrl = request.params.organizationId;

		const result = user.ability.can(
			rule.action,
			// @ts-expect-error until isSubject check
			subject(rule.subject, {
				...subjectObject,
				organizationId: orgIdFromUrl,
			}),
		);

		return result;
	}
}
