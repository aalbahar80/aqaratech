const getToken = async () => {
	try {
		const res = await fetch("https://dev-eehvhdp2.eu.auth0.com/oauth/token", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				client_id: process.env.AUTH0_CLIENT_ID,
				client_secret: process.env.AUTH0_CLIENT_SECRET,
				audience: "letand.be/api", // TODO: use env
				grant_type: "client_credentials", // TODO: use env
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
		const res = await fetch(`${process.env.DOMAIN}/transactions/notify-all`, {
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
