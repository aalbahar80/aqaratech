export const maintenanceStatusOptions = [
	// use empty string to represent null,
	// otherwise a string 'null' may be sent to the server
	// https://stackoverflow.com/a/62303327/9689661
	{ label: '', value: '' },
	{ label: 'PENDING', value: 'PENDING' },
	{ label: 'COMPLETED', value: 'COMPLETED' },
	{ label: 'CANCELLED', value: 'CANCELLED' },
];
