import type { SelectedOption } from './option.interface';

interface LeaseOptions {
	tenant: SelectedOption;
	portfolio: SelectedOption;
	property: SelectedOption;
	unit: SelectedOption;
}

interface PredefinedTenant extends LeaseOptions {
	initiator: 'tenant';
	tenantId: string;
}

interface PredefinedUnit extends LeaseOptions {
	initiator: 'unit';
	unitId: string;
	propertyId: string;
}

interface PredefinedLease extends LeaseOptions {
	initiator: 'lease';
	tenantId: string;
	unitId: string;
	propertyId: string;
	monthlyRent: number;
}
// helper type for new lease form
export type Predefined = PredefinedTenant | PredefinedUnit | PredefinedLease;

interface LeaseWTenant {
	id: string;
	tenant: {
		id: string;
		fullName: string;
	};
	start: Date;
	end: Date;
}

interface LeaseWUnit {
	id: string;
	unit: {
		id: string;
		unitLabel: string;
		property: {
			area: string | null;
			block: string | null;
			street: string | null;
			number: string | null;
		};
	};
	start: Date;
	end: Date;
}

export type LeaseCardData = LeaseWTenant | LeaseWUnit;
