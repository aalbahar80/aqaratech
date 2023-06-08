import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { NovuService } from 'src/novu/novu.service';
import { PhoneVerificationTemplate } from 'src/novu/novu.types';
import { MESSAGE_TAG } from 'src/postmark/tags';
import { PrismaService } from 'src/prisma/prisma.service';

import {
	ConfirmPhoneDto,
	PhoneVerificationCode,
	VerificationResponse,
	VerifyPhoneDto,
} from './phone-verify.dto';

@Injectable()
export class PhoneVerifyService {
	constructor(
		private readonly smsService: NovuService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService,
	) {}

	async verifyPhone(
		verifyPhoneDto: VerifyPhoneDto,
		email: string,
	): Promise<VerificationResponse> {
		const { phone } = verifyPhoneDto;

		const code = this.generateVerificationCode();
		await this.storeVerificationCode(phone, code);
		const template = {
			tag: MESSAGE_TAG.PHONE_VERIFICATION,
			subscriberId: email,
			phone: phone,
			payload: {
				code: code,
			},
		} satisfies PhoneVerificationTemplate;
		await this.smsService.sendSMS(template);

		return { success: true, message: 'Verification code sent' };
	}

	async confirmPhone(
		confirmPhoneDto: ConfirmPhoneDto,
		email: string,
	): Promise<VerificationResponse> {
		const { phone, code } = confirmPhoneDto;

		const storedCode = await this.getStoredVerificationCode(phone);

		if (!storedCode || storedCode !== code) {
			throw new BadRequestException('Invalid or expired verification code');
		}

		await this.markPhoneNumberAsVerified(phone, email);

		return { success: true, message: 'Phone number verified' };
	}

	private generateVerificationCode(): PhoneVerificationCode {
		return Math.floor(
			100000 + Math.random() * 900000,
		).toString() as PhoneVerificationCode;
	}

	private async storeVerificationCode(
		phone: string,
		code: PhoneVerificationCode,
	): Promise<void> {
		const TTL = 600000; // 10 minutes
		await this.cache.set(phone, code, TTL);
	}

	private async getStoredVerificationCode(
		phone: string,
	): Promise<PhoneVerificationCode | undefined> {
		const code = await this.cache.get<PhoneVerificationCode>(phone);
		return code;
	}

	private async markPhoneNumberAsVerified(
		phone: string,
		email: string,
	): Promise<void> {
		// remove verification code from cache
		await this.cache.del(phone);

		// set phone number on user
		await this.prisma.c.user.update({
			where: { email },
			data: {
				phone: phone,
				isPhoneVerified: true,
			},
		});
	}

	async claimRoles(email: string) {
		const user = await this.prisma.c.user.findUniqueOrThrow({
			where: { email },
		});

		if (!user.phone) {
			throw new BadRequestException('User phone number is not set');
		}

		if (!user.isPhoneVerified) {
			throw new BadRequestException('User phone number is not verified');
		}

		// get all tenants with this phone number
		const tenants = await this.prisma.c.tenant.findMany({
			where: {
				AND: [
					{ phone: user.phone }, // tenant phone number matches user phone number
					{ roles: { none: { userId: user.id } } }, // user is not already connected to this tenant
				],
			},
		});

		// connect user to all tenants
		const results = await Promise.all(
			tenants.map((tenant) =>
				this.prisma.c.role.create({
					data: {
						roleType: 'TENANT',
						organization: { connect: { id: tenant.organizationId } },
						tenant: { connect: { id: tenant.id } },
						user: { connect: { id: user.id } },
					},
				}),
			),
		);

		return results.length;
	}
}
