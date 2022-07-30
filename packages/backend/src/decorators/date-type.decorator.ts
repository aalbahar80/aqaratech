import { applyDecorators } from '@nestjs/common';
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
    Transform((p) => {
      if (!isISO8601(p.value)) {
        return null;
      } else {
        return new Date(p.value);
      }
    }),

    // 2. Validate
    IsDate(),
    ApiProperty({ type: 'string', example, required }),
  );
}
