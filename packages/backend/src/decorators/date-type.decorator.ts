import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsISO8601 } from 'class-validator';

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
 */
export function DateType(required = true): PropertyDecorator {
  const example = new Date('2012-12-21').toISOString();
  return applyDecorators(
    IsDate(),
    Transform((p) => (p.value ? new Date(p.value) : null), {
      toClassOnly: true,
    }),
    ApiProperty({ type: 'string', example, required }),
  );
}
