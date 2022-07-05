import child_process from "child_process";
import chokidar from "chokidar";
import * as fs from "fs";

let oldStats: fs.Stats | undefined;
chokidar
	.watch("./openapi.yaml", {
		alwaysStat: true,
		awaitWriteFinish: true,
	})
	.on("change", (path, stats) => {
		if (stats) {
			const message = `openapi.yml stats: oldsize: ${oldStats?.size}, newsize: ${stats.size}`;
			console.log(message);

			const changed = stats.size !== oldStats?.size;
			if (changed || !oldStats) {
				console.log("openapi.yaml changed detected, generating new sdk...");

				// clean old directories
				child_process.execSync("rm -rf ./src && rm -rf ./dist");

				// generate sdk
				const child = child_process.spawn("pnpm", ["run", "build"]);

				child.stdout?.on("data", (data) => {
					console.log(`stdout: ${data}`);
				});

				child.stderr?.on("data", (data) => {
					console.error(`stderr: ${data}`);
				});

				child.on("close", (code) => {
					console.log(`child process exited with code ${code}`);
				});
			} else {
				console.log("skipping sdk generation...");
			}

			oldStats = stats;
		}
	});
