/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators } from '@nestjs/common';
import type { ApiPropertyOptions } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	//   ArrayMaxSize,
	//   ArrayMinSize,
	//   ArrayNotEmpty,
	IsOptional,
	IsPositive,
	IsString,
	IsUUID,
	Max,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';
import * as R from 'remeda';

// import { supportedLanguageCount } from '../constants';
import {
	ToArray,
	ToLowerCase,
	ToUpperCase,
	Trim,
} from './transform.decorators';
// import { IsPassword, IsPhoneNumber, IsTmpKey } from './validator.decorators';

interface IStringFieldOptions {
	minLength?: number;
	maxLength?: number;
	toLowerCase?: boolean;
	toUpperCase?: boolean;
	swagger?: boolean;
}

interface INumberFieldOptions {
	each?: boolean;
	minimum?: number;
	maximum?: number;
	int?: boolean;
	isPositive?: boolean;
	swagger?: boolean;
}

/**
 * id validator
 */
export function IsID(): PropertyDecorator {
	return applyDecorators(IsUUID());
}

export function NumberField(
	options: Omit<ApiPropertyOptions, 'type'> & INumberFieldOptions = {},
): PropertyDecorator {
	const decorators = [Type(() => Number)];

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { each, int, minimum, maximum, isPositive, swagger } = options;

	if (swagger !== false) {
		decorators.push(
			// ApiProperty({ type: Number, ...options, example: int ? 1 : 1.2 }),
			ApiProperty({ type: Number, ...options }),
		);
	}

	if (each) {
		decorators.push(ToArray());
	}

	if (int) {
		decorators.push(IsInt({ each }));
	} else {
		decorators.push(IsNumber({}, { each }));
	}

	if (R.isNumber(minimum)) {
		decorators.push(Min(minimum, { each }));
	}

	if (R.isNumber(maximum)) {
		decorators.push(Max(maximum, { each }));
	}

	if (isPositive) {
		decorators.push(IsPositive({ each }));
	}

	return applyDecorators(...decorators);
}

export function NumberFieldOptional(
	options: Omit<ApiPropertyOptions, 'type' | 'required'> &
		Partial<{
			each: boolean;
			int: boolean;
			isPositive: boolean;
		}> = {},
): PropertyDecorator {
	return applyDecorators(
		IsOptional(),
		NumberField({ required: false, ...options }),
	);
}

export function StringField(
	options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator {
	const decorators = [IsNotEmpty(), IsString(), Trim()];

	if (options?.swagger !== false) {
		decorators.push(ApiProperty({ type: String, ...options }));
	}

	if (options?.minLength) {
		decorators.push(MinLength(options.minLength));
	}

	if (options?.maxLength) {
		decorators.push(MaxLength(options.maxLength));
	}

	if (options?.toLowerCase) {
		decorators.push(ToLowerCase());
	}

	if (options?.toUpperCase) {
		decorators.push(ToUpperCase());
	}

	return applyDecorators(...decorators);
}

export function StringFieldOptional(
	options: Omit<ApiPropertyOptions, 'type' | 'required'> &
		IStringFieldOptions = {},
): PropertyDecorator {
	return applyDecorators(
		IsOptional(),
		StringField({ required: false, ...options }),
	);
}

// export function EnumField<TEnum>(
//   getEnum: () => TEnum,
//   options: Omit<ApiPropertyOptions, 'type' | 'enum' | 'enumName'> &
//     Partial<{
//       each: boolean;
//       swagger: boolean;
//     }> = {},
// ): PropertyDecorator {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const enumValue = getEnum() as any;
//   const decorators = [IsEnum(enumValue as object, { each: options.each })];

//   if (options?.swagger !== false) {
//     decorators.push(ApiEnumProperty(getEnum, options));
//   }

//   if (options.each) {
//     decorators.push(ToArray());
//   }

//   return applyDecorators(...decorators);
// }

// export function EnumFieldOptional<TEnum>(
//   getEnum: () => TEnum,
//   options: Omit<ApiPropertyOptions, 'type' | 'required' | 'enum' | 'enumName'> &
//     Partial<{ each: boolean; swagger: boolean }> = {},
// ): PropertyDecorator {
//   return applyDecorators(
//     IsOptional(),
//     EnumField(getEnum, { required: false, ...options }),
//   );
// }
