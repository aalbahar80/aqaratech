#!/usr/bin/env zx

import kill from 'tree-kill';
import 'zx/globals';

// For each port passed in, use tree-kill to kill the process
//
// Usage: ./kill-ports.mjs -p 3000 -p 3002

console.log({ argv });

let ports;

if (Array.isArray(argv.p)) {
	ports = argv.p;
} else {
	ports = [argv.p];
}

if (ports.length === 0) {
	console.log('No ports passed in');
	await $`exit 1`;
}

let pids = [];
for (const port of ports) {
	// find all processes listening on the port
	let pidRaw;
	try {
		pidRaw = await $`lsof -i :${port} -sTCP:LISTEN -t`;
	} catch (e) {
		console.log(`No process found listening on port ${port}`);
		continue;
	}

	if (pidRaw.stdout.length === 0) {
		console.log(`No process listening on port ${port}`);
		continue;
	}

	// strip new line
	const processId = pidRaw.stdout.trim();

	console.log(`Found process ${processId} on port ${port}`);

	pids = [...pids, processId];
}

if (pids.length === 0) {
	console.log('No processes to kill');
	await $`exit 0`;
}

console.log(`Killing processes ${pids.join(', ')}`);

for (const pid of pids) {
	console.log(`Killing process on port ${pid}`);
	kill(+pid);
}

try {
	await $`lsof -i :3002; lsof -i :3000`;
	console.log(chalk.red('Failed to kill all processes'));
} catch (e) {
	console.log(chalk.green('Successfully killed all processes'));
}
