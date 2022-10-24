import { ArgumentMetadata, Injectable, ValidationPipe } from '@nestjs/common';

const shouldSkip = [
	'CreateTenantDto',
	'UpdateTenantDto',
	'CreatePortfolioDto',
	'UpdatePortfolioDto',
	'CreatePropertyDto',
	'UpdatePropertyDto',
	'CreateUnitDto',
	'UpdateUnitDto',
	'CreateLeaseDto',
	'UpdateLeaseDto',
	'CreateExpenseDto',
	'UpdateExpenseDto',
	'CreateFileDto',
	'CreateLeaseInvoiceDto',
	'UpdateLeaseInvoiceDto',
	'CreateManyLeaseInvoicesDto',
];

// Reference: https://github.com/nestjs/nest/issues/2390#issuecomment-517623971
// More about DI in global pipes: https://docs.nestjs.com/guards#binding-guards
/**
 * ValidationPipe is global. For some routes, we want to use ZodValidationPipe instead.
 * This is a workaround to make the global ValidationPipe skip validating the specified DTO's.
 */
@Injectable()
export class MyValidationPipe extends ValidationPipe {
	override async transform(value: unknown, metadata: ArgumentMetadata) {
		let skip = false;

		const name = metadata.metatype?.name;

		if (name && shouldSkip.includes(name)) {
			skip = true;
		}

		if (skip) {
			console.log('skipping default validation for: ', name);
			return value;
		}

		return super.transform(value, metadata);
	}
}
