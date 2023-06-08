import { ApiProperty } from '@nestjs/swagger';
import { ZodTypeDef, z } from 'zod';

import { phoneSchema } from '@self/utils';

const codeSchema = z.string().min(6).max(6).brand<'PhoneVerificationCode'>();
export type PhoneVerificationCode = z.infer<typeof codeSchema>;

export class VerifyPhoneDto {
	phone: string;
}

export class ConfirmPhoneDto {
	phone: string;
	@ApiProperty({ type: String })
	code: PhoneVerificationCode;
}

export class ClaimRolesResponse {
	success: boolean;
	message: string;
	roleCount: number;
}

export class VerificationResponse {
	success: boolean;
	message: string;
}

export const verifyPhoneSchema = z.object({
	phone: phoneSchema,
}) satisfies z.ZodType<VerifyPhoneDto, ZodTypeDef, unknown>;

export const confirmPhoneSchema = z.object({
	phone: phoneSchema,
	code: codeSchema,
}) satisfies z.ZodType<ConfirmPhoneDto, ZodTypeDef, unknown>;

export const verificationResponseSchema = z.object({
	success: z.boolean(),
	message: z.string(),
}) satisfies z.ZodType<VerificationResponse, ZodTypeDef, unknown>;
