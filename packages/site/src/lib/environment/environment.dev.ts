import type { EnvironmentConfig } from '$models/interfaces/environment.interface';
import { config } from 'dotenv';

config();

const getOrigin = (localhostAllowed = true): string => {
	const origin = process.env.URL_ORIGIN;
	if (origin?.includes('dev') || origin?.includes('stage')) {
		return origin;
	} else if (process.env.VERCEL) {
		return `https://${process.env.VERCEL_URL}`;
	} else if (!localhostAllowed) {
		return 'http://127.0.0.1:3000';
	} else {
		return 'http://localhost:3000';
	}
};

export const developmentEnvironment: EnvironmentConfig = {
	type: 'DEVELOPMENT',
	envName: 'dev',
	urlOrigin: getOrigin(),
	authConfig: {
		AUTH0_CLIENT_ID: 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct',
		AUTH0_CLIENT_SECRET:
			'uSR4Gjf3XNN-1kfZGuppDqRdbz7XD6A4o2g8yY1GdZgqCXeYhWhdqfPUoIIJLBRf',
		AUTH0_DOMAIN: 'https://dev-eehvhdp2.eu.auth0.com',
		AUTH0_DEFAULT_DOMAIN: 'https://dev-eehvhdp2.eu.auth0.com',
		AUTH0_ROLE_ID_PROPERTY_OWNER: 'rol_n6YdReDFqv4IG60y',
		AUTH0_ROLE_ID_TENANT: 'rol_7C04rw2vmXs2pOTx',
		AUTH0_REDIRECT_URI: `${getOrigin()}/api/auth/callback`,
		AUTH0_API_NAMESPACE: 'https://letand.be',
		AUTH0_API_AUDIENCE: 'letand.be/api',
		JWKS: {
			keys: [
				{
					alg: 'RS256',
					kty: 'RSA',
					use: 'sig',
					n: 'ty7ykF-72NiokwwsZJR3t15VMS2SGAzxac-DkPpRSsYtMsKVgBBt-jCdKeHkAt_k8vphRFyjFm8k-a-TNTCWtGnHP9LWQK4s6ZTNzktAHb_qbNg8kfV8cYvQGO-X0UCGmg7h3BHpBTx5IZFBSeG3MLRyfEvjZS0Ys8XrB5e3pS8KgkaUgcEB9wAXRwg0w7ZpAns6rq_7KEvZX_vEsufzcIFMF3dLIywXnN493Y186qf6bx-tW-NsXzZd6qtvxW03_xVMlgMXRvlY-BEs_uk1dhYndo9mz8kSYm1dLjyt-5EcIqUnPxXA46-Pqd6cAAgUCPfu439es850P1JVd9CYgQ',
					e: 'AQAB',
					kid: 'eoJj1hlBuhYdXt6cym6m3',
					x5t: 'njrntKD4tsaJWk1BQB8WAlHdVas',
					x5c: [
						'MIIDDTCCAfWgAwIBAgIJRejdsvKplhN/MA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20wHhcNMjExMjExMTgyNDI3WhcNMzUwODIwMTgyNDI3WjAkMSIwIAYDVQQDExlkZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAty7ykF+72NiokwwsZJR3t15VMS2SGAzxac+DkPpRSsYtMsKVgBBt+jCdKeHkAt/k8vphRFyjFm8k+a+TNTCWtGnHP9LWQK4s6ZTNzktAHb/qbNg8kfV8cYvQGO+X0UCGmg7h3BHpBTx5IZFBSeG3MLRyfEvjZS0Ys8XrB5e3pS8KgkaUgcEB9wAXRwg0w7ZpAns6rq/7KEvZX/vEsufzcIFMF3dLIywXnN493Y186qf6bx+tW+NsXzZd6qtvxW03/xVMlgMXRvlY+BEs/uk1dhYndo9mz8kSYm1dLjyt+5EcIqUnPxXA46+Pqd6cAAgUCPfu439es850P1JVd9CYgQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQN/ULMKyknpAz/wFNJBR4muJYX1jAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAHWubNrAQqT/PAqd56CaFps6MAGrWCuV/YjskxodbuIjoIvO9wm5bNTnTerDsirsiDF9wwl2VhH+Zu1DbEJteIrRcIhFGjAOudw5Ix9m4gn7biqMBd1z6mTBXfEpLtywCYoL1rbuNqM9yD7JjrE/bDytZh/kzIT7s0KKXFVtxx1l1HFd4+V/y0mSWQ/o+eyEFNyEZD//lZnGwPA/EaE3bp6Y5iQWF7KvzRWvU9W2ExS9JnzsldX3OeLhQ7+p+azfRe7ERuJV7V3i1oiNbpSwEs907q2ilVoCYY4Kp05OqrseaLG+HL77qMaMfXKVbGY2rFWdipTBCYWyMXWvyzbHy5A=',
					],
				},
				{
					alg: 'RS256',
					kty: 'RSA',
					use: 'sig',
					n: 'v8KzFwNyNceQjfs1IXqjwOCgqMss507TUA3F_U-RoZmrnclbcxjuI4WE1_iFgRFnKdFOxpr5oJhGvI3pp4k8Oq_HbHNchoXk00Jd4sqykKeCSCSxliJpKlIrvB4DIBOkQeX6ihoqEY6-YXQ0BcSvvXeUh6jJxypnuK6731FwJ32LcOmJCLIeHtF2VZwv3IpJPFWyGuB5AcEDfB0VfpoHuk6QBNEgi9U10I_gJDGDdY7BCwTXshMvWaGY_TbOLb5eC1y4dZAp_CGh5LURjmTe2h91xBCu9W8Vu6n-kTHAfjizm-6kXxe7HQTRYWEwwDdt3f9iOTU-kH502JKgOxz6bw',
					e: 'AQAB',
					kid: 'kXp8dyTMzfS5656AC2_gb',
					x5t: 'eOBBAgZpY4GYgOweWhKzrJw7_QM',
					x5c: [
						'MIIDDTCCAfWgAwIBAgIJNkWczeRHeBpRMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20wHhcNMjExMjExMTgyNDI3WhcNMzUwODIwMTgyNDI3WjAkMSIwIAYDVQQDExlkZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv8KzFwNyNceQjfs1IXqjwOCgqMss507TUA3F/U+RoZmrnclbcxjuI4WE1/iFgRFnKdFOxpr5oJhGvI3pp4k8Oq/HbHNchoXk00Jd4sqykKeCSCSxliJpKlIrvB4DIBOkQeX6ihoqEY6+YXQ0BcSvvXeUh6jJxypnuK6731FwJ32LcOmJCLIeHtF2VZwv3IpJPFWyGuB5AcEDfB0VfpoHuk6QBNEgi9U10I/gJDGDdY7BCwTXshMvWaGY/TbOLb5eC1y4dZAp/CGh5LURjmTe2h91xBCu9W8Vu6n+kTHAfjizm+6kXxe7HQTRYWEwwDdt3f9iOTU+kH502JKgOxz6bwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTi2sNJ+6yTS+Z9Oq6N7BfTA/YpWTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAJvwdAx1URTyuRFFrM6ZUpU95+a9J2zF9OCuMtT0waAkldkbi63oRNdds9YKWdIAc44IlY8HyirmCuDjy1v3nVbUoya97aOnc/HaBr9ZO2ohr5N8hoSf4fqqyxKVGmrSZCSxYpZC1VkD6tpVNGYkzwjZa/J4HwQWYWGNWFO2Veajl4kSOOLqVO0yJK6niG4GiEQhRprmkGNkyInv8PUgnWo6yXHYmtkdvai43l8RVrntrgo1i1ZWi8XnJOQBQg6dGFbYR1R5/wRHAVCd9VaOVTsEWpFJnKSItsGkCB116OkolMIU1+didV2ec9uGrN7f71tgx6vNy2NLVPn/l26DCLw=',
					],
				},
			],
		},
	},
	myfatoorahConfig: {
		MYFATOORAH_BASE_URL: 'https://apitest.myfatoorah.com',
		MYFATOORAH_TOKEN:
			'HKcuHSpmaDG3SDluux5XDOm6aucEO3KKddJcDNZ71CRYgTNRhKRJXV4LezbvXV2mw3gJ3uH5fZr0Hpi-55p1Yo9Bpr7aX3OsGuNGllBdpCUfli2wXfPnlbwtfKVY1UnOUsqeoFUUjD7SbsOZY5Rz_OgL26dd-bLDX4ToB08XuudcxKzNqCKncqP-4maqQlOdGUm1krElqwzReJK5U4OX1PFy7xNAABRIztQ0OHSiuge4l2m-WwvLZ_47BBK2P_uXAY1UI0g5OB3_Pyy9soZ4v9lAPM2Mb1rVBRZ0LbkS0LQquIJjRaOZzPymzsdcGJfpOgg3VrmpbUUma6I0tCSeorlLveuYPW0sYszzrTVuDDYQ_DvMe1jtQZFDHsH_cPP4YGIBJEC0F92gj7yU3T3p47hKAmrqiWC63fKvRsOVNZHrceCa6RlCNLyBR6qszh5YIKWo8yC2EqbNkb4bFstQ4NL7oFUnIC2nqCQ4Awfts5u85ygBaN1uLtxDKxUAgN3ZyteyGaYndjSl2AFBtae4mrPz7Q_dMHp8rY4AA0KLOG9fqpDzdcGEeYlE-dMQtpStvhHwty9Pob5-eTk4xXIBUGHedVI5eSdpyuj_xT3tgasHaJhQi5J9NTDphCiBCTa2YZYiMzXVx78NiuDuP-ytp9Y42nbqF4X3BJ2j1BkmoAql7sTR3P-VPJ8CL9PD2_9SAUtgIw',
		MYFATOORAH_CALLBACK_URL: getOrigin(false),
	},
	twilioConfig: {
		TWILIO_ACCOUNT_SID: 'ACbffc494534d2b9823213e4538d71c98d',
		TWILIO_AUTH_TOKEN: 'a94743f7f5baf621a2f2535f05c03970',
		TWILIO_FROM_NUMBER: '+15005550006',
		TWILIO_MESSAGING_SERVICE_SID: 'MG3f2cf0ea4f8d7c554cad650ef646da65',
	},
	mailConfig: {
		POSTMARK_TOKEN: 'aecd4fd3-1314-44e9-b1b5-d7dbb89fd0ca',
	},
	debug: true,
};
