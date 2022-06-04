import type { SelectedOption } from './option.interface';

interface PredefinedTenant {
	initiator: 'tenant';
	tenantId: string;
	firstName: string;
	lastName: string;
	fullName: string;
	tenant: SelectedOption;
	client: SelectedOption;
	property: SelectedOption;
	unit: SelectedOption;
}
interface PredefinedUnit {
	initiator: 'unit';
	unitId: string;
	unitType: string | null;
	unitNumber: string;
	propertyId: string;
	address: string;
	tenant: SelectedOption;
	client: SelectedOption;
	property: SelectedOption;
	unit: SelectedOption;
}

interface PredefinedLease {
	initiator: 'lease';
	tenantId: string;
	firstName: string;
	lastName: string;
	fullName: string;
	unitId: string;
	unitType: string | null;
	unitNumber: string;
	propertyId: string;
	address: string;
	monthlyRent: number;
	tenant: SelectedOption;
	client: SelectedOption;
	property: SelectedOption;
	unit: SelectedOption;
}
// helper type for new lease form
export type Predefined = PredefinedTenant | PredefinedUnit | PredefinedLease;

interface LeaseWTenant {
	id: string;
	tenant: {
		id: string;
		firstName: string;
		lastName: string;
		fullName: string;
	};
	start: Date;
	end: Date;
}

interface LeaseWUnit {
	id: string;
	unit: {
		id: string;
		unitNumber: string;
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
