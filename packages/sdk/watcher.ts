import child_process from "child_process";
import chokidar from "chokidar";
import * as fs from "fs";
let oldStats: fs.Stats | undefined;

interface SpawnSyncReturns<T> {
	pid: number;
	output: Array<T | null>;
	stdout: T;
	stderr: T;
	status: number | null;
	signal: NodeJS.Signals | null;
	error?: Error | undefined;
}

chokidar
	.watch("./openapi.yaml", {
		alwaysStat: true,
		awaitWriteFinish: true,
	})
	.on("change", (path, stats) => {
		if (stats) {
			const now = new Date();

			const message = `openapi.yml stats: oldsize: ${oldStats?.size}, newsize: ${stats.size}`;
			console.log(message);

			const changed = stats.size !== oldStats?.size;
			if (changed || !oldStats) {
				console.log("openapi.yaml changed detected, generating new sdk...");

				try {
					child_process.execSync("pnpm run build");
					child_process.execSync("pnpm --filter @self/site run check");
				} catch (error) {
					const e = error as SpawnSyncReturns<Buffer>;
					console.log(e.stdout.toString("utf-8"));
				}
			} else {
				console.log("skipping sdk generation...");
			}

			oldStats = stats;

			console.log(`done in ${new Date().getTime() - now.getTime()}ms`);
		}
	});
