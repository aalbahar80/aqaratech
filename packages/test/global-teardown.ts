// import type { FullConfig } from '@playwright/test';
// import cp from 'node:child_process';
// import kill from 'tree-kill';

// async function globalTeardown(config: FullConfig) {
// 	// Kill any hanging servers

// 	// const PORTS = [3000, 3002];

// 	console.log('[GLOBAL-TEARDOWN] Attempting to extract ports from config');

// 	// Grab ports from config
// 	// @ts-expect-error webServers is a private property
// 	// eslint-disable-next-line
// 	const PORTS: number[] = config._webServers.map((ws) => ws.port);

// 	if (!PORTS.length) {
// 		console.warn(
// 			'[GLOBAL-TEARDOWN] No ports found. This might be an error. Consider listing the ports manually in global-teardown.ts',
// 		);
// 		return;
// 	}

// 	const pids: number[] = [];
// 	for (const port of PORTS) {
// 		const portPids = cp
// 			.execSync(`lsof -i tcp:${port} -t`)
// 			.toString()
// 			.trim()
// 			.split(' ');

// 		// sometimes there are multiple pids for a single port
// 		for (const pid of portPids) {
// 			pids.push(parseInt(pid));
// 			console.log(`Found process ${pid} on port ${port}`);
// 		}
// 	}

// 	console.log(`Preparing to kill ${pids.length} processes`);

// 	for (const pid of pids) {
// 		if (wasProcessStartedByPlaywright(pid)) {
// 			console.log(`Killing process ${pid}`);
// 			kill(pid);
// 		}
// 	}

// 	// wait for the processes to die
// 	await new Promise((resolve) => setTimeout(resolve, 100));

// 	for (const port of PORTS) {
// 		try {
// 			const status = cp.execSync(`lsof -i :${port}`).toString().trim();
// 			console.log(status);
// 			console.warn(`Port ${port} is still in use`);
// 		} catch (error) {
// 			console.log(`Port ${port} is free`);
// 		}
// 	}
// }

// export default globalTeardown;

// const wasProcessStartedByPlaywright = (pid: number): boolean => {
// 	// use `ps -axwo pid,stat | grep ${pid}` to get the process status
// 	// if it is not running in the foreground, it was started by playwright

// 	const processStatus = cp
// 		.execSync(`ps -axwo pid,stat | grep ${pid}`)
// 		.toString()
// 		.trim();

// 	console.log({ processStatus }, 'global-teardown.ts ~ 56');

// 	const inBackground = processStatus.includes('<');

// 	if (inBackground) {
// 		console.log(`Process ${pid} was started by Playwright`);
// 		return true;
// 	} else {
// 		console.log(`Process ${pid} was NOT started by Playwright`);
// 		return false;
// 	}
// };
