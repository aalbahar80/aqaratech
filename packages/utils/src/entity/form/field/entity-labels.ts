import { portfolioCreateSchema, portfolioUpdateSchema } from 'src/schemas';
import { getFieldLabelMap } from './field-label-map';

export const labelOverrides = {
	portfolio: {
		fullName: 'Full Name',
	},
};

export const entityFieldLabels = {
	portfolio: getFieldLabelMap([portfolioCreateSchema, portfolioUpdateSchema], {
		fullName: 'Full Name',
		dob: 'Date of Birth',
		civilid: 'Civil ID',
	}),
};
