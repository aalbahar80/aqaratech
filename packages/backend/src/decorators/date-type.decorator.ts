import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';

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
export function DateType(): PropertyDecorator {
  return applyDecorators(
    IsISO8601(),
    ApiProperty({
      type: 'string',
      example: new Date('2012-12-21').toISOString(),
    }),
  );
}

export function DateTypeOptional(): PropertyDecorator {
  return applyDecorators(
    IsISO8601(),
    ApiPropertyOptional({
      type: 'string',
      example: new Date('2012-12-21').toISOString(),
    }),
  );
}
