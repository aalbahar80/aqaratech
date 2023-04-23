import { TCan } from 'src/casl/abilities/ability-types';
import { Action } from 'src/casl/action.enum';

export const defineUnauthenticatedAbility = (can: TCan) => {
	can(Action.ReadOne, ['LeaseInvoice', 'LeaseInvoiceV']);
};
