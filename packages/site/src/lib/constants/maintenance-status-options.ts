import { MAINTENANCE_ORDER_STATUS } from '@self/utils';

// use empty string to represent null,
// otherwise a string 'null' may be sent to the server
// https://stackoverflow.com/a/62303327/9689661
export const maintenanceStatusOptions = MAINTENANCE_ORDER_STATUS.map(
	(status) => ({
		label: status,
		value: status,
	}),
);
