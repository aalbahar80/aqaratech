import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, "../../site/.env") });
config({
	path: path.resolve(__dirname, "../.env"),
	override: true, // override auth0 id/secret to give this cron job it's own auth0 tenant.
});

const getToken = async () => {
	try {
		const res = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				client_id: process.env.AUTH0_CLIENT_ID,
				client_secret: process.env.AUTH0_CLIENT_SECRET,
				audience: process.env.AUTH0_API_AUDIENCE,
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
		// console.log(process.env, "notify-all.ts ~ 26");
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

const token = await getToken();
await notifyAll(token);
