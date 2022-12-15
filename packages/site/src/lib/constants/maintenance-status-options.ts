export const maintenanceStatusOptions = [
	// use empty string to represent null,
	// otherwise a string 'null' may be sent to the server
	// https://stackoverflow.com/a/62303327/9689661
	{ label: '', value: '' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Completed', value: 'completed' },
	{ label: 'Cancelled', value: 'cancelled' },
];
