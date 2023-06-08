import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipRoleGuard } from 'src/auth/public.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { UserBasic } from 'src/decorators/user-basic.decorator';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

import {
	ClaimRolesResponse,
	ConfirmPhoneDto,
	VerificationResponse,
	VerifyPhoneDto,
	confirmPhoneSchema,
	verifyPhoneSchema,
} from './phone-verify.dto';
import { PhoneVerifyService } from './phone-verify.service';

@Controller('phone-verify')
@ApiTags('phone-verify')
@SwaggerAuth()
export class PhoneVerifyController {
	constructor(private readonly phoneVerificationService: PhoneVerifyService) {}

	@Post('initiate')
	@SkipRoleGuard()
	async initiate(
		@UserBasic() user: AuthenticatedUser,
		@Body(new ZodValidationPipe(verifyPhoneSchema))
		verifyPhoneDto: VerifyPhoneDto,
	): Promise<VerificationResponse> {
		return await this.phoneVerificationService.verifyPhone(
			verifyPhoneDto,
			// Since this will be directly associated with the user object (as opposed
			// to tenant object) we use the user's email as the Novu subscriberId
			user.email,
		);
	}

	@Post('confirm')
	@SkipRoleGuard()
	async confirm(
		@UserBasic() user: AuthenticatedUser,
		@Body(new ZodValidationPipe(confirmPhoneSchema))
		confirmPhoneDto: ConfirmPhoneDto,
	): Promise<VerificationResponse> {
		return await this.phoneVerificationService.confirmPhone(
			confirmPhoneDto,
			user.email,
		);
	}

	@Post('claim-roles')
	@SkipRoleGuard()
	async claimRoles(
		@UserBasic() user: AuthenticatedUser,
	): Promise<ClaimRolesResponse> {
		const count = await this.phoneVerificationService.claimRoles(user.email);
		return {
			success: true,
			message: 'Roles claimed',
			roleCount: count,
		};
	}
}
