const prod = process.env.NODE_ENV === "production";

const { client_id, client_secret, audience, authOrigin, server } = prod
	? {
			client_id: "qryphRH2sF6l9blvQEbZj2qV565znp3d",
			client_secret: process.env.AUTH0_CLIENT_SECRET,
			audience: "https://aqaratech.com/api",
			authOrigin: "https://auth.aqaratech.com",
			server: "https://aqaratech.com",
	  }
	: {
			client_id: "46xg2CFeKgkRl3WjoELZIQ3TizcV4MSb",
			client_secret:
				"dbbsv2QSRrPtQaRENuDn4SXwWtWBwkB614aRMOsodlSAiY5edqw43KOGclwuksnh",
			audience: "letand.be/api",
			authOrigin: "https://dev-eehvhdp2.eu.auth0.com",
			server: process.env.SERVER_ORIGIN || "http://localhost:3000",
	  };

const getToken = async () => {
	try {
		const res = await fetch(`${authOrigin}/oauth/token`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				client_id,
				client_secret,
				audience,
				grant_type: "client_credentials",
			}),
		});
		const data = await res.json();
		return data.access_token;
	} catch (err) {
		console.error(err);
	}
};

const notifyAll = async (token: string) => {
	try {
		const res = await fetch(`${server}/transactions/notify-all`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				mode: "email",
			}),
		});
		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.error(err);
	}
};

const token = await getToken();
await notifyAll(token);

export {};
