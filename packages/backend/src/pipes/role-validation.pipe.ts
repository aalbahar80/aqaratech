/* eslint-disable @typescript-eslint/ban-types */
import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateRoleDto } from 'src/roles/dto/role.dto';

/**
 * Validates that exactly one of organizationId, portfolioId, or tenantId is specified.
 */
@Injectable()
export class RoleValidationPipe implements PipeTransform<any, any> {
	transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToInstance(metatype, value);
		this.validate(object);
		return value;
	}

	// remove toValidate?
	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}

	private validate(value: CreateRoleDto) {
		const count = +Boolean(value.portfolioId) + +Boolean(value.tenantId);
		// if (value.)

		if (count > 1) {
			throw new BadRequestException(
				'Must specify exactly one or zero of portfolioId and tenantId',
			);
		}
	}
}
