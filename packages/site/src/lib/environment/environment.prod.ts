import { env } from '$env/dynamic/private';
import { AUTH_CALLBACK } from '$lib/constants/routes';
import type { EnvironmentConfig } from '$models/interfaces/environment.interface';

// TODO: populate constants such as domain, callbackDomain, etc.
export const productionEnvironment: EnvironmentConfig = {
	type: 'PRODUCTION',
	envName: 'prod',
	urlOrigin: 'https://aqaratech.com',
	authConfig: {
		AUTH0_CLIENT_ID: 'BiIwmY0aGldYHDkkdEVsTBbKAAE1AaQV',
		AUTH0_CLIENT_SECRET: env.AUTH0_CLIENT_SECRET,
		AUTH0_DOMAIN: 'https://auth.aqaratech.com',
		AUTH0_DEFAULT_DOMAIN: 'https://aqaratech.eu.auth0.com',
		AUTH0_ROLE_ID_PROPERTY_OWNER: 'rol_UD1FC1yzwrtoAAKe',
		AUTH0_ROLE_ID_TENANT: 'rol_5xmAmhrwRtC83E9n',
		AUTH0_REDIRECT_URI: `https://aqaratech.com${AUTH_CALLBACK}`,
		AUTH0_API_NAMESPACE: 'https://aqaratech.com',
		AUTH0_API_AUDIENCE: 'https://aqaratech.com/api',
		JWKS: {
			keys: [
				{
					alg: 'RS256',
					kty: 'RSA',
					use: 'sig',
					n: '-6_lIXUxSqmmFsrvUpL3c7gzDKSqC41XnXjrnLcrAwQ6ow0XfC-7agl6dhWDvMN2lsK0tAAIYbiT0E-LUgv_NAUbp3kqLVuva35vwNQ92DE14x4csWX_OYfummShXjfzyu08r8_xFTLNfxD3iPPakyaYuLfSv2eQcUJPIvVlWgf93x9hr76slvG3YlMZPfClcywbnEKL8oVxTh3c456F0ZrZiPKcB4eWkvnvD1vg5QTssgUpEPdU2JvpQdvx3fOS9Xu8ef1c58lBYXe3H5xdcJwiuDHMao0dY6q0thmykqBAXDb4dNzSDoxvb2G2LADTiBoS0wys9UJ-QoQ-Rkcb8w',
					e: 'AQAB',
					kid: '1hBeQiWQZQ_YO_NuJ2mLS',
					x5t: 'c7t2cnDkJK-rm7jmHKaD2fstfoU',
					x5c: [
						'MIIDBzCCAe+gAwIBAgIJHHU1Vkpvm/vvMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmFxYXJhdGVjaC5ldS5hdXRoMC5jb20wHhcNMjIwNDE4MDAwNDAwWhcNMzUxMjI2MDAwNDAwWjAhMR8wHQYDVQQDExZhcWFyYXRlY2guZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6/lIXUxSqmmFsrvUpL3c7gzDKSqC41XnXjrnLcrAwQ6ow0XfC+7agl6dhWDvMN2lsK0tAAIYbiT0E+LUgv/NAUbp3kqLVuva35vwNQ92DE14x4csWX/OYfummShXjfzyu08r8/xFTLNfxD3iPPakyaYuLfSv2eQcUJPIvVlWgf93x9hr76slvG3YlMZPfClcywbnEKL8oVxTh3c456F0ZrZiPKcB4eWkvnvD1vg5QTssgUpEPdU2JvpQdvx3fOS9Xu8ef1c58lBYXe3H5xdcJwiuDHMao0dY6q0thmykqBAXDb4dNzSDoxvb2G2LADTiBoS0wys9UJ+QoQ+Rkcb8wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBS/Ews+Xk3YZXpQ+2NU2GhQl0ODLTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBADKr2MgfH+PZ4wyfMm289H+Fwg6VpksMjp6t1q8/jIBziRmPwJ/oxVclPwfVN8pBeUalhR/MBxAUCHzwyyMR6veq49MJ+VMrP+EL1yA+B1/75+JUP+IvowU1M7XCnpyNEr4o7+Ndqu0VhlL+7cpBtjKYymRRM/t51chXES5sVc2JzjNIdaS/s48aCrvKKj5Qg5CLdxPvV8RRpbbof2uSBYAGNv6onIWYVVH1icGVq22et3NUF2UfA1r4P35c0x/tmh3PFZojvCmtF2Ir8vx0zuDV+NNKCkA3JWFt5D8aiVdERPcUFNzmWSuw4v4cwr7Po/QOU70rhu/O/EmtLSY0fjY=',
					],
				},
				{
					alg: 'RS256',
					kty: 'RSA',
					use: 'sig',
					n: 'zZuiffgt-PYJOJ6lHbN9Zx5-sRfjCcLTwhqPqwQcb0tQLMXIJA4FA1NE1hZt87RZTd5xQiP9M0QPDU6T6eScpNnU5YW7DZCsHphypglZtV2m110QJ5nHWb0p7hinKzpfSXYj0YNoCahxe9ZNEzb-vNIoDMg89GODKamd7yvddHH3NUaXwq9KW6f4JlCDwwUGzhQ5ekC-n9wpfY9ouVcPOb4gABSzp6v3B0HIBWu3BbgdnXBLd21XIQrPel_oTTF6bCBQov-JpE9oFrbcj8wYkFFr_bFQjq_A9Vr2BNWG-KMIgkA0FZFyVxCsXG1oZYvZaEK7OKjWvFHsu885A5WcDQ',
					e: 'AQAB',
					kid: 'vRVKBKOIFqd-UUevq3sAp',
					x5t: 'fjiFy0aSSfN0xnqjeZoTrE3Tqc0',
					x5c: [
						'MIIDBzCCAe+gAwIBAgIJZ+RttT4hdcg1MA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFmFxYXJhdGVjaC5ldS5hdXRoMC5jb20wHhcNMjIwNDE4MDAwNDAwWhcNMzUxMjI2MDAwNDAwWjAhMR8wHQYDVQQDExZhcWFyYXRlY2guZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzZuiffgt+PYJOJ6lHbN9Zx5+sRfjCcLTwhqPqwQcb0tQLMXIJA4FA1NE1hZt87RZTd5xQiP9M0QPDU6T6eScpNnU5YW7DZCsHphypglZtV2m110QJ5nHWb0p7hinKzpfSXYj0YNoCahxe9ZNEzb+vNIoDMg89GODKamd7yvddHH3NUaXwq9KW6f4JlCDwwUGzhQ5ekC+n9wpfY9ouVcPOb4gABSzp6v3B0HIBWu3BbgdnXBLd21XIQrPel/oTTF6bCBQov+JpE9oFrbcj8wYkFFr/bFQjq/A9Vr2BNWG+KMIgkA0FZFyVxCsXG1oZYvZaEK7OKjWvFHsu885A5WcDQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTTsmK3OhX//s0/meFa10HfcVILsTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAMlMZV5mcG+fsYuRTr3NyhA4imTmZXnUJsrfSLm5QdAmLU0GSHJnw6xWgzkKzlBvkXYvC6mwD01Q2gTiJAS3j75QlOTwanyVmwvWFzsQYzCuBMWGjEGel9Het/KNQdxosAgOG/MXMKrhi04DQEEDAjK/HXgoSOEDt/3oohSxqHdj8FYcqFXmrpvtT1s7nV42lP9UtP6NKbK4hCkE3mb446Zi6oOxoFHi3I6mrnbc+/1KH4vZYWWEAse2AWTcafrDF+khUVc6S/+LaWAwBjmYBCH5T/x+Ai/SY8bIf5HwGwcYnCO40Q0q0PcDqGDq3ezhh2Wb3VBBiczEhNvitEQYdWk=',
					],
				},
			],
		},
	},
	debug: false,
};
