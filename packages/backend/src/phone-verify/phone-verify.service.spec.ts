import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { DeepMockProxy } from 'vitest-mock-extended';

import { NovuService } from 'src/novu/novu.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { tokenMocker } from 'test/util/mocker';

import { PhoneVerificationCode } from './phone-verify.dto';
import { PhoneVerifyService } from './phone-verify.service';

const PHONE = '12345678';
const USER_ID = 'testUserId';
const CODE = '123456' as PhoneVerificationCode;

describe('PhoneVerifyService', () => {
	let service: PhoneVerifyService;
	let prismaService: DeepMockProxy<PrismaService>;
	let smsService: NovuService;
	let cache: Cache;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [PhoneVerifyService],
		})
			.useMocker(tokenMocker)
			.compile();

		service = moduleRef.get(PhoneVerifyService);
		prismaService = moduleRef.get(PrismaService);
		smsService = moduleRef.get(NovuService);
		cache = moduleRef.get(CACHE_MANAGER);
	});

	it('should return success', async () => {
		const res = await service.verifyPhone({ phone: '12345678' }, USER_ID);
		expect(res.success).toBe(true);
	});

	it('should confirm phone number with correct verification code', async () => {
		// Mock cache manager
		vi.spyOn(cache, 'get').mockResolvedValue(CODE);

		// Mock Prisma Service update method
		const spy = prismaService.c.user.update.mockResolvedValueOnce({} as any);

		const res = await service.confirmPhone(
			{ phone: PHONE, code: CODE },
			USER_ID,
		);

		expect(res.success).toBe(true);
		expect(spy).toHaveBeenCalledWith({
			where: { email: USER_ID },
			data: {
				phone: PHONE,
				isPhoneVerified: true,
			},
		});
	});

	it('should throw an error for incorrect verification code', async () => {
		vi.spyOn(cache, 'get').mockResolvedValue(CODE);

		await expect(
			service.confirmPhone(
				{
					phone: PHONE,
					code: 'wrongCode' as PhoneVerificationCode,
				},
				USER_ID,
			),
		).rejects.toThrow('Invalid or expired verification code');
	});

	it('should throw an error for expired verification code', async () => {
		vi.spyOn(cache, 'get').mockResolvedValue(undefined); // TTL expired

		await expect(
			service.confirmPhone({ phone: PHONE, code: CODE }, USER_ID),
		).rejects.toThrow('Invalid or expired verification code');
	});

	it('should send an SMS with the code', async () => {
		const spy = vi.spyOn(smsService, 'sendSMS');
		await service.verifyPhone({ phone: PHONE }, USER_ID);

		expect(spy).toHaveBeenCalledWith(
			expect.objectContaining({
				tag: 'PHONE_VERIFICATION',
				subscriberId: USER_ID,
				phone: PHONE,
				payload: expect.objectContaining({
					code: expect.any(String),
				}),
			}),
		);
	});

	it('should generate a six digit code', async () => {
		const spy = vi.spyOn(smsService, 'sendSMS');
		await service.verifyPhone({ phone: PHONE }, USER_ID);

		expect(spy).toHaveBeenCalledWith(
			expect.objectContaining({
				payload: expect.objectContaining({
					code: expect.stringMatching(/^\d{6}$/), // six digit code
				}),
			}),
		);
	});

	it('should clear the cache after successful verification', async () => {
		vi.spyOn(cache, 'get').mockResolvedValue(CODE);
		const spy = vi.spyOn(cache, 'del');
		await service.confirmPhone({ phone: PHONE, code: CODE }, USER_ID);

		expect(spy).toHaveBeenCalledWith(PHONE);
	});
});
