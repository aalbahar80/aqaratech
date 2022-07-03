import * as fs from "fs";
import chokidar from "chokidar";
import child_process from "child_process";

let oldStats: fs.Stats | undefined;
chokidar
	.watch("./openapi.yaml", {
		alwaysStat: true,
		awaitWriteFinish: true,
	})
	.on("change", (path, stats) => {
		// console.log(event, path, stats);
		if (stats) {
			const message = `oldsize: ${oldStats?.size}, newsize: ${stats.size}`;
			console.log(message);

			const changed = stats.size !== oldStats?.size;
			if (changed) {
				console.log("size changed");

				// delete /dist folder
				child_process.execSync("rm -rf ./dist");

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
				console.log("no change in size");
			}

			oldStats = stats;
		}
	});
