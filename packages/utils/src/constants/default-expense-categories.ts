import { z } from 'zod';

import { generateId } from 'src/misc/generate-id';
import {
	ExpenseCategoryCreateSchema,
	expenseCategoryCreateSchema,
} from 'src/schemas/expense-category.schema';

const expenseCategoryCreateWithIdSchema = expenseCategoryCreateSchema.extend({
	id: z.string(),
});

/** Default expense categories. Have predefined ID's. */
type ExpenseCategoryCreateWithId = ExpenseCategoryCreateSchema & {
	id: string;
};

/**
 * Returns a default expense category tree with random ids.
 */
export const generateExpenseCategoryTree = () => {
	const mappedIds = new Map<string, string>();

	defaultExpenseCategoryTree.forEach((category) => {
		mappedIds.set(category.id, generateId());
	});

	const withRandomIds = defaultExpenseCategoryTree.map((category) => {
		const newId = mappedIds.get(category.id);

		const newParentId = category.parentId
			? mappedIds.get(category.parentId)
			: null;

		return {
			...category,
			id: newId ?? generateId(),
			parentId: newParentId ?? null,

			labelAr: category.labelAr ?? null,
		};
	});

	// Parse schema before entering into db to nullify empty strings.
	const tree = withRandomIds.map((category) =>
		expenseCategoryCreateWithIdSchema.parse(category),
	);

	return tree;
};

/**
 * Generate a random id for both the `id` and `parentId` fields.
 */
// prettier-ignore
const defaultExpenseCategoryTree: ExpenseCategoryCreateWithId[] = [
  {"id":"1","labelAr":"المصاريف الرأسمالية","labelEn":"CapEx","parentId":null,"isGroup":true},
  {"id":"2","labelAr":"عقود الصيانة السنوية","labelEn":"Annual Contracts","parentId":"1","isGroup":true},
  {"id":"3","labelAr":"","labelEn":"AC Contract","parentId":"2","isGroup":false},
  {"id":"4","labelAr":"","labelEn":"Elevator Contract","parentId":"2","isGroup":false},
  {"id":"5","labelAr":"","labelEn":"Fire Fighting Contract","parentId":"2","isGroup":false},
  {"id":"6","labelAr":"","labelEn":"Other CapEx","parentId":"1","isGroup":true},
  {"id":"7","labelAr":"","labelEn":"Waterproofing","parentId":"6","isGroup":false},
  {"id":"8","labelAr":"","labelEn":"Renovation","parentId":"6","isGroup":false},
  {"id":"9","labelAr":"","labelEn":"Major repairs","parentId":"6","isGroup":false},
  {"id":"10","labelAr":"","labelEn":"Structural Integrity","parentId":"6","isGroup":false},
  {"id":"11","labelAr":"المصاريف التشغيلية","labelEn":"OpEx","parentId":null,"isGroup":true},
  {"id":"12","labelAr":"المصاريف القانونية","labelEn":"Legal & Financial","parentId":"11","isGroup":true},
  {"id":"13","labelAr":"","labelEn":"Attorneys Fee","parentId":"12","isGroup":false},
  {"id":"14","labelAr":"","labelEn":"Insurance","parentId":"12","isGroup":false},
  {"id":"15","labelAr":"","labelEn":"Bank charges","parentId":"12","isGroup":false},
  {"id":"16","labelAr":"المصاريف الحكومية","labelEn":"Government","parentId":"11","isGroup":true},
  {"id":"17","labelAr":"","labelEn":"Municipal fees","parentId":"16","isGroup":false},
  {"id":"18","labelAr":"","labelEn":"Government Stamps","parentId":"16","isGroup":false},
  {"id":"19","labelAr":"","labelEn":"Government Paperwork","parentId":"16","isGroup":false},
  {"id":"20","labelAr":"","labelEn":"Government Violations","parentId":"16","isGroup":false},
  {"id":"21","labelAr":"رواتب الحارس","labelEn":"Salaries","parentId":"11","isGroup":true},
  {"id":"22","labelAr":"","labelEn":"Caretaker Wages","parentId":"21","isGroup":false},
  {"id":"23","labelAr":"","labelEn":"Caretaker Vacation leave","parentId":"21","isGroup":false},
  {"id":"24","labelAr":"","labelEn":"Caretaker pension","parentId":"21","isGroup":false},
  {"id":"25","labelAr":"","labelEn":"Caretaker Insurance & resident permit","parentId":"21","isGroup":false},
  {"id":"26","labelAr":"خدمات الكهرباء والماء","labelEn":"Utilities","parentId":"11","isGroup":true},
  {"id":"27","labelAr":"","labelEn":"Water Consumption","parentId":"26","isGroup":false},
  {"id":"28","labelAr":"","labelEn":"Electrical Consumption","parentId":"26","isGroup":false},
  {"id":"29","labelAr":"","labelEn":"Gas","parentId":"26","isGroup":false},
  {"id":"30","labelAr":"","labelEn":"Trash","parentId":"26","isGroup":false},
  {"id":"31","labelAr":"خدمات الإصلاحات","labelEn":"Repairs","parentId":"11","isGroup":true},
  {"id":"32","labelAr":"","labelEn":"Central Ventilation","parentId":"31","isGroup":false},
  {"id":"33","labelAr":"","labelEn":"Paint repairs","parentId":"31","isGroup":false},
  {"id":"34","labelAr":"","labelEn":"Doors repairs","parentId":"31","isGroup":false},
  {"id":"35","labelAr":"","labelEn":"Glass repairs","parentId":"31","isGroup":false},
  {"id":"36","labelAr":"","labelEn":"Aluminum repairs","parentId":"31","isGroup":false},
  {"id":"37","labelAr":"","labelEn":"Plasterwork repairs","parentId":"31","isGroup":false},
  {"id":"38","labelAr":"","labelEn":"Electrical repairs","parentId":"31","isGroup":false},
  {"id":"39","labelAr":"","labelEn":"Plumbing repairs","parentId":"31","isGroup":false},
  {"id":"40","labelAr":"","labelEn":"Gypsum repairs","parentId":"31","isGroup":false},
  {"id":"41","labelAr":"خدمات الصيانة","labelEn":"Maintenance","parentId":"11","isGroup":true},
  {"id":"42","labelAr":"","labelEn":"Property Maintenance","parentId":"41","isGroup":false},
  {"id":"43","labelAr":"","labelEn":"Amenities Maintenance","parentId":"41","isGroup":false},
  {"id":"44","labelAr":"","labelEn":"Apartment Maintenance","parentId":"41","isGroup":false},
  {"id":"45","labelAr":"","labelEn":"AC Maintenance","parentId":"41","isGroup":false},
  {"id":"46","labelAr":"","labelEn":"Elevator Maintenance","parentId":"41","isGroup":false},
  {"id":"47","labelAr":"","labelEn":"Electrical Maintenance","parentId":"41","isGroup":false},
  {"id":"48","labelAr":"","labelEn":"Plumbing maintenance","parentId":"41","isGroup":false},
  {"id":"49","labelAr":"المصاريف الإدارية","labelEn":"Management","parentId":null,"isGroup":true},
  {"id":"50","labelAr":"","labelEn":"Management fees","parentId":"49","isGroup":false},
  {"id":"51","labelAr":"","labelEn":"Subscription fees","parentId":"49","isGroup":false}
]
