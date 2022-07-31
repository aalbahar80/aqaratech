import { applyDecorators, BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, isISO8601 } from 'class-validator';

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
export function DateType(required = true): PropertyDecorator {
  const example = new Date('2012-12-21').toISOString();
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
          !p.value.endsWith('00:00:00.000Z')
        ) {
          console.warn(
            'DateType: ISO8601 string is not ending with "00:00:00.000Z"',
          );
          console.log(p);
        }

        if (!isISO8601(p.value)) {
          // Find way to work this error into class-validator's error messsages.
          // Returning null here makes class-validator skip the `IsDate` validation for some reason.
          // return null;
          throw new BadRequestException(`Invalid date: ${p.key}: ${p.value}`);
        } else {
          return new Date(p.value);
        }
      },
      { toClassOnly: true },
    ),

    // 2. Validate
    IsDate(),
    ApiProperty({ type: 'string', example, required }),
  );
}
