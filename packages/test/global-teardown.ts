import cp from 'node:child_process';
import kill from 'tree-kill';

function globalTeardown() {
	// kill any hanging servers
	const PORTS = [3000, 3002];

	for (const port of PORTS) {
		const pid = cp.execSync(`lsof -i tcp:${port} -t`).toString().trim();
		console.log(`Killing process ${pid} on port ${port}`);
		if (pid) {
			kill(+pid);
		}
	}
}

export default globalTeardown;
