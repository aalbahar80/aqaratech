import { BackendEnvSchema } from 'src/env/env.schema';
import { AuthConfigType } from 'src/env/types/auth.type';

export const authConfig = (environment: BackendEnvSchema) => {
	if (environment.PUBLIC_AQARATECH_ENV === 'production') {
		return prodAuthConfig;
	} else {
		return devAuthConfig;
	}
};

const devAuthConfig = {
	AUTH0_DOMAIN: 'https://aqaratech-dev.eu.auth0.com',
	AUTH0_API_NAMESPACE: 'https://letand.be',
	AUTH0_API_AUDIENCE: 'letand.be/api',
	JWKS: { "keys":[{"kty":"RSA","use":"sig","n":"0ppHNCFaRZzNJRUjigMQPhxAyl5ENtdEKhEv5e0_cL6ux5y4hytctanM8mzLg5HWfHuiF0fzsXJjcJBAR-Qc80vBlz3wV0wKpoGrXDE7uT5X0is9Dbo0sxQ6bx2tAa9KSSvybVD_iize5Uewdqa0K22VJDtmC4TyXqswnvE1G9QtN96g1AC7NXv2oxT2C3Jh4pTgs1qSrDhq8TeXz9Pj4h02nzJj3vVABNGinCQS9xHAPn_QMSYEBDa6C2tdZhBm9DmeUO-Vy6tZznsBOfL7tTqKy7g9hVa9RpX8l6QffJXvZqgTmzwE4aT7RLAAyqeJs3AG2xDBdwg0ko0oMk-qEQ","e":"AQAB","kid":"1O_idCGxsCB5PAgSHIDYK","x5t":"z0RJc-dtkqAQghxbJW8sxrA7ErY","x5c":["MIIDDzCCAfegAwIBAgIJCRaLBFBgiVq4MA0GCSqGSIb3DQEBCwUAMCUxIzAhBgNVBAMTGmFxYXJhdGVjaC1kZXYuZXUuYXV0aDAuY29tMB4XDTI0MDUwOTIzMTExNloXDTM4MDExNjIzMTExNlowJTEjMCEGA1UEAxMaYXFhcmF0ZWNoLWRldi5ldS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDSmkc0IVpFnM0lFSOKAxA+HEDKXkQ210QqES/l7T9wvq7HnLiHK1y1qczybMuDkdZ8e6IXR/OxcmNwkEBH5BzzS8GXPfBXTAqmgatcMTu5PlfSKz0NujSzFDpvHa0Br0pJK/JtUP+KLN7lR7B2prQrbZUkO2YLhPJeqzCe8TUb1C033qDUALs1e/ajFPYLcmHilOCzWpKsOGrxN5fP0+PiHTafMmPe9UAE0aKcJBL3EcA+f9AxJgQENroLa11mEGb0OZ5Q75XLq1nOewE58vu1OorLuD2FVr1GlfyXpB98le9mqBObPAThpPtEsADKp4mzcAbbEMF3CDSSjSgyT6oRAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFJbSLC73vIA/s4Xd+58TDqYw+mW0MA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAzlDHD6M6FdkquW3G5HnTvVXX6dDb9+gtM7qvcfKShAr23Spobqx0Gi8NjjqRFztgwcscARAewpM1We+Q4S30zHg+2PMzAlrH+8rmlcA2jWhBHAIZJ+3zsl871Idnk4EqPZOlAdiIdEyThv+Ihz92uNgkggT2+8GP3zjumP2cuanQW+ovzYN3N3zzltdtCFzf4qqAu3zvcanGSj0nw3K7R3rOU2EvFrJ3Hxqy59odcA7VBH6klS5aKJYiwqob/l56FhD8aF1tONfUvWIqk5+N2m5gELNoL+xVC2QREWVHdNFrB+a5iWby9nvGTm7VRrwa3xysQEyrl62S7kR2NjNmDg=="],"alg":"RS256"},{"kty":"RSA","use":"sig","n":"nQrQT_0WhZwL1XfWqfB0uRV6P6g9j1BFrWHh7BTFfvPXUk0pUhxPxV-mRtNHQTy1Ufk5I2gyCUI_bE7vJ5bS6Fh73aWBsgnVyu1h0DyI_vOkM8FGrh2zjBrw0-aL89j02KHqxXF-O0fj31UbjniFKd1MZGXv7cu4gnm3dRIz0lGAwb6DpBKO1_15NAKfif7l-MLesN-T5Kq3lHGWFliO1SibGRfWrnBM1ied5XHTer7i8qoiimVTYDOMvekFhSLkfrPiFO3oqAg_rRi3gj4C_ha2ZX8pblEEXjILgV2uf4GAPoPqTYuQlYEMvEwXKKuACbS1OHBroU2d99LyyeMVEQ","e":"AQAB","kid":"Ey6rxmV4c_iNtqjmvNDMr","x5t":"Ip6YWaRyY8noHskil-RcsmMpICo","x5c":["MIIDDzCCAfegAwIBAgIJDyFteOd6HQAzMA0GCSqGSIb3DQEBCwUAMCUxIzAhBgNVBAMTGmFxYXJhdGVjaC1kZXYuZXUuYXV0aDAuY29tMB4XDTI0MDUwOTIzMTExNloXDTM4MDExNjIzMTExNlowJTEjMCEGA1UEAxMaYXFhcmF0ZWNoLWRldi5ldS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCdCtBP/RaFnAvVd9ap8HS5FXo/qD2PUEWtYeHsFMV+89dSTSlSHE/FX6ZG00dBPLVR+TkjaDIJQj9sTu8nltLoWHvdpYGyCdXK7WHQPIj+86QzwUauHbOMGvDT5ovz2PTYoerFcX47R+PfVRuOeIUp3UxkZe/ty7iCebd1EjPSUYDBvoOkEo7X/Xk0Ap+J/uX4wt6w35PkqreUcZYWWI7VKJsZF9aucEzWJ53lcdN6vuLyqiKKZVNgM4y96QWFIuR+s+IU7eioCD+tGLeCPgL+FrZlfyluUQReMguBXa5/gYA+g+pNi5CVgQy8TBcoq4AJtLU4cGuhTZ330vLJ4xURAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFBMkRm0pz+ZfRmLvJOWD5t26CtM5MA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAcmy1VFEFCXT3yy9qclrGZ+F4k9zpwhXcyX5fZRw6hJa8LK3YrSywaw9p04XtRk4y1SesosUd5ebVm8H4PmVuJ5782ahKnAEc4Pm5WO9Ri2PtFyvj6+aMvHYPCgKwux7AqzhmQVQfOD0Wje+6Qi1GuMDk864oB2I20VNiVqIW4Y+rceYe15nMMMbz7pD8BaQde5x/OUSk1DLtoLazhKheDGPyNOj9JRRahPqTGkjP4T+m58rWojW5Oa7R7UePSr84y0T7fFUOgj830lG0B08v9YwS0V4nhkCqPlaijbnENvz04peJMgej6lWZZS3XtxOBOWBhd0SG3NpZz0jNRAJ4Wg=="],"alg":"RS256"}], },
} satisfies AuthConfigType;

const prodAuthConfig = {
	AUTH0_DOMAIN: 'https://auth.aqaratech.com',
	AUTH0_API_NAMESPACE: 'https://aqaratech.com',
	AUTH0_API_AUDIENCE: 'https://aqaratech.com/api',
	JWKS: { "keys":[{"kty":"RSA","use":"sig","n":"ofElwCtV-AD3Yp9JcOdmKpsQyi2NMDp97FIWSWdK9taFEjxJ12MiBglytFMn7BtT0EOFFexAQkg4jTEQaZOBjjnnt7mUv4nrRGJ2o6KzD0sVlvzPkhwUkuktHioMU1gNR_5bXCUkh9zZvuq_XxjFyvTFX8jO3tgKtpcCsdjRbDy8zdSiI8r-6seM7n6SUikpjp6yNvtIAdGTr6qW5q-i-rBAwDwIUWAgVtZZgo7doLCYtBPFXhUnUwNK7AfmjfyLjBdLNqGfysr_uXM-XUPOV-sGbRdYW6dAECURiWI98XGP8uK0qoGyDi9EC1badPSfrO-mkmDYZNRTsqmwzcGL-Q","e":"AQAB","kid":"Q1BGYgaPA8fzoqCDrIzY6","x5t":"aSiYHuIkmmPm_M5ZOTkxZddVHwk","x5c":["MIIDETCCAfmgAwIBAgIJRM8dSUxjgk6KMA0GCSqGSIb3DQEBCwUAMCYxJDAiBgNVBAMTG2FxYXJhdGVjaC1wcm9kLmV1LmF1dGgwLmNvbTAeFw0yNDA1MTEyMzUyNDZaFw0zODAxMTgyMzUyNDZaMCYxJDAiBgNVBAMTG2FxYXJhdGVjaC1wcm9kLmV1LmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKHxJcArVfgA92KfSXDnZiqbEMotjTA6fexSFklnSvbWhRI8SddjIgYJcrRTJ+wbU9BDhRXsQEJIOI0xEGmTgY4557e5lL+J60RidqOisw9LFZb8z5IcFJLpLR4qDFNYDUf+W1wlJIfc2b7qv18Yxcr0xV/Izt7YCraXArHY0Ww8vM3UoiPK/urHjO5+klIpKY6esjb7SAHRk6+qluavovqwQMA8CFFgIFbWWYKO3aCwmLQTxV4VJ1MDSuwH5o38i4wXSzahn8rK/7lzPl1DzlfrBm0XWFunQBAlEYliPfFxj/LitKqBsg4vRAtW2nT0n6zvppJg2GTUU7KpsM3Bi/kCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUjk36pYxSdd5Cb/qwECLlF/WMoVcwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBsyxZpkMPBQoxaxErlxmAnZ+5ttLRPLatWSxUE/+v1PnuxpofTIz7Q68lVeDtwdIuBzUz0/XBsB/Le2Dm3dZtEg7HstuiDokCz0XchngrFNSUQ2rT3n7qhIXtBxPvv+EFjMkTQ42qFBPst72ksNlJz3vqffyj5VaoPbNVrIgPHMLB720pMO+/6FKsEZE9vYnxdvM2UgxC5SK+kfcpeorOdN8l/qdeSgoibu1bKyxt03WCYc4v+zcpXeIQmtkZMjegD45ubeGdc52f4gER6TDHER2Mae+v94x4/9UIXitW3bEYUQal9JhuPl+QRjiLrYeDsai+3iT1VxwO2tXFSAmqG"],"alg":"RS256"},{"kty":"RSA","use":"sig","n":"s04n0iFY7ozowsSE5-0OpsazjLMLABZclRK_gwAkuTmTzrw5ThihOhZz0J4fpf488t2L0LT3o9IxstGRi-QCd4scoTFpdDnSvrxAFNG8fH7saYtIUt-rr6hdYs9sFTzE_ZfpfIG5iQeTm3Mm1swtEIwahJz3Jp_oC0FtqGxsQeEnVkBdXyYwAInDthCIVIDuPZnqgju8BR0q9sif3-AwVOskopDVxN5tMXzEknmymo0gTZBnL06VzUSsgKTm4YTV5UAkUxAB8UQt_S1JQCXDGwqlqRdnLxOVA1FNfCBVeYdRp9xMFFEFXL9u50FGEJIyZTyN8X1osrpEwhqs256YNw","e":"AQAB","kid":"wEDSxGqzKLmqR7xpIHyou","x5t":"C6YQQMaOZmHUmChpfbzzikX7Nzw","x5c":["MIIDETCCAfmgAwIBAgIJTQco0pA9yT+gMA0GCSqGSIb3DQEBCwUAMCYxJDAiBgNVBAMTG2FxYXJhdGVjaC1wcm9kLmV1LmF1dGgwLmNvbTAeFw0yNDA1MTEyMzUyNDZaFw0zODAxMTgyMzUyNDZaMCYxJDAiBgNVBAMTG2FxYXJhdGVjaC1wcm9kLmV1LmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALNOJ9IhWO6M6MLEhOftDqbGs4yzCwAWXJUSv4MAJLk5k868OU4YoToWc9CeH6X+PPLdi9C096PSMbLRkYvkAneLHKExaXQ50r68QBTRvHx+7GmLSFLfq6+oXWLPbBU8xP2X6XyBuYkHk5tzJtbMLRCMGoSc9yaf6AtBbahsbEHhJ1ZAXV8mMACJw7YQiFSA7j2Z6oI7vAUdKvbIn9/gMFTrJKKQ1cTebTF8xJJ5spqNIE2QZy9Olc1ErICk5uGE1eVAJFMQAfFELf0tSUAlwxsKpakXZy8TlQNRTXwgVXmHUafcTBRRBVy/budBRhCSMmU8jfF9aLK6RMIarNuemDcCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUf5tItQlZpifd9Ssfatp3F2H7WqAwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBoUmXq7r+Rc0LD+x68XWJetLnL+WbLMsmBhZwzwlXzQbv6tRAuvz53lYOFSXDjpMjMtLR9p22IxTzmtrrDsGoWHLpqp8h6tKg5n769onMTZ1SD07hv82Og7PO/xwoGpbun5DTLRVlBbR+A62fbfBDs2Kd+nl5LTZrsLYD2qX0edmgfzDwN9+rsTQUxz9dzEX2lbJMB815r8k4U7wtGXSXTSKS5wUobF8Nwn/ywrVLXOnXDXPdWWkzvXsPeSc8NfFOlYtEi6gEh05a7Dobbm2CKEcPY1rMsHSi+a+6LMRyNYsg1skrJw/VWuj4NS58XAn94t4w9JkFwfbxPI0cpn3b7"],"alg":"RS256"}] },
} satisfies AuthConfigType;
