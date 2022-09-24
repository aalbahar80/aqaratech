import { applyDecorators, BadRequestException, Logger } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, isISO8601, IsOptional } from 'class-validator';

/**
 * Decorator to make openapi-generator to treat dates as strings.
 *
 * https://github.com/OpenAPITools/openapi-generator/pull/11685
 *
 * Once this is released in 6.1.0, we can add type mapping to openapitools.json config file.
 *
 * ```json
 *  "typeMappings": {
 *    "date": "string",
 *    "DateTime": "string"
 *  },
 *```
 *
 * Incoming dates from client:
 * 1. Date is received as string.
 * 2. Class-transformer will convert it to Date since we're using `Type(() => Date)`.
 */
export function DateType(required = true, readOnly = false): PropertyDecorator {
	return applyDecorators(
		// 1. Transform
		Transform(
			(p) => {
				if (
					// pending bug: strict option not being respected
					// https://github.com/typestack/class-validator/issues/1061
					// https://github.com/validatorjs/validator.js/issues/2003
					isISO8601(p.value, { strict: true }) &&
					typeof p.value === 'string' &&
					p.value.length > 10 &&
					!p.value.endsWith('00:00:00.000Z')
				) {
					Logger.warn(
						'DateType: ISO8601 string is not ending with "00:00:00.000Z"',
						{ key: p.key, value: p.value, obj: p.obj },
					);
				}

				if (isISO8601(p.value)) {
					return new Date(p.value);
				} else if (p.value === null || p.value === undefined) {
					Logger.log('DateType: null or undefined');
					return p.value;
				} else if (typeof p.value === 'string' && required) {
					// client sends string, but it's not ISO8601. Reject it because it's required.
					throw new BadRequestException(`Invalid date: ${p.key}: ${p.value}`);
				} else if (typeof p.value === 'string' && !required) {
					// tranform it to null. Most commonly this will be an empty string.
					return null;
				} else {
					return p.value;
				}
			},
			{ toClassOnly: true },
		),

		// 2. Validate
		...(required ? [] : [IsOptional()]),
		IsDate(),
		ApiProperty({
			type: 'string',
			...(readOnly ? { readOnly: true } : {}),
		}),
	);
}
