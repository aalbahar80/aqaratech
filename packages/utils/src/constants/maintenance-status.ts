export const MAINTENANCE_ORDER_STATUS = {
	PENDING: 'Pending',
	COMPLETED: 'Completed',
	CANCELLED: 'Cancelled',
} as const;

export type MaintenanceOrderStatus =
	(typeof MAINTENANCE_ORDER_STATUS)[keyof typeof MAINTENANCE_ORDER_STATUS];
