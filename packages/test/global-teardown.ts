import cp from 'node:child_process';
import kill from 'tree-kill';

function globalTeardown() {
	// kill any hanging servers
	const PORTS = [3000, 3002];

	const pids: number[] = [];
	for (const port of PORTS) {
		const portPids = cp
			.execSync(`lsof -i tcp:${port} -t`)
			.toString()
			.trim()
			.split(' ');

		// sometimes there are multiple pids for a single port
		for (const pid of portPids) {
			pids.push(parseInt(pid));
			console.log(`Found process ${pid} on port ${port}`);
		}
	}

	console.log(`Preparing to kill ${pids.length} processes`);

	for (const pid of pids) {
		console.log(`Killing process ${pid}`);
		kill(pid);
	}
}

export default globalTeardown;
