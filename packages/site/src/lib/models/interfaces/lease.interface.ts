import type { SelectedOption } from './common/option.interface';

interface PredefinedTenant {
	initiator: 'tenant';
	tenantId: string;
	firstName: string;
	lastName: string;
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
