import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { tokenMocker } from 'test/util/mocker';

import { PhoneVerifyController } from './phone-verify.controller';
import { PhoneVerificationCode } from './phone-verify.dto';
import { PhoneVerifyService } from './phone-verify.service';

describe('PhoneVerifyController', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [PhoneVerifyController],
			providers: [
				PhoneVerifyService,
				{
					provide: APP_GUARD,
					useValue: {
						canActivate: (ctx: ExecutionContext) => {
							const request = ctx.switchToHttp().getRequest();
							request.user = { email: 'a@a.com', ability: {} };
							return true;
						},
					},
				},
			],
		})
			.useMocker(tokenMocker)
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	describe('initiate', () => {
		it('should return success message if input is valid', async () => {
			const verifyPhoneDto = { phone: '12345678' };

			return await request(app.getHttpServer())
				.post('/phone-verify/initiate')
				.send(verifyPhoneDto)
				.expect(201)
				.expect((res) => {
					expect(res.body.success).toEqual(true);
					expect(res.body.message).toEqual('Verification code sent');
				});
		});

		it('should error if no phone provided', async () => {
			const verifyPhoneDto = { phone: '' };

			return await request(app.getHttpServer())
				.post('/phone-verify/initiate')
				.send(verifyPhoneDto)
				.expect(400)
				.expect((res) => {
					expect(res.body.fieldErrors.phone).toContain(
						'Expected string, received null',
					);
				});
		});
	});

	describe('confirm', () => {
		it('should return success message if input is valid', async () => {
			const confirmPhoneDto = {
				phone: '12345678',
				code: '111111' as PhoneVerificationCode,
			};

			const cache = app.get(CACHE_MANAGER);
			vi.spyOn(cache, 'get').mockResolvedValue('111111');

			return await request(app.getHttpServer())
				.post('/phone-verify/confirm')
				.send(confirmPhoneDto)
				.expect(201)
				.expect((res) => {
					expect(res.body.success).toEqual(true);
					expect(res.body.message).toEqual('Phone number verified');
				});
		});

		it('should error if no phone provided', async () => {
			const confirmPhoneDto = {
				phone: '',
				code: '123456' as PhoneVerificationCode,
			};

			return await request(app.getHttpServer())
				.post('/phone-verify/confirm')
				.send(confirmPhoneDto)
				.expect(400)
				.expect((res) => {
					expect(res.body.fieldErrors.phone).toContain(
						'Expected string, received null',
					);
				});
		});

		it('should error if no code provided', async () => {
			const confirmPhoneDto = {
				phone: '12345678',
				code: '' as PhoneVerificationCode,
			};

			return await request(app.getHttpServer())
				.post('/phone-verify/confirm')
				.send(confirmPhoneDto)
				.expect((res) => {
					expect(res.body.fieldErrors.code).toContain(
						'String must contain at least 6 character(s)',
					);
				})
				.expect(400);
		});
	});
});
