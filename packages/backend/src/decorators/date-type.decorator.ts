import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

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
 */
// @ts-expect-error - Workaround until issue is fixed in openapi-generator.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DateType(required = true, readOnly = false): PropertyDecorator {
	return applyDecorators(
		ApiProperty({
			type: 'string',
			...(readOnly ? { readOnly: true } : {}),
		}),
	);
}
