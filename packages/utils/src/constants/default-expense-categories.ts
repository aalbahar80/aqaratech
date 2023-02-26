import { z } from 'zod';

import {
	expenseCategoryCreateSchema,
	type ExpenseCategoryCreateSchema,
} from '../schemas/expense-category.schema';

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
export const generateExpenseCategoryTree = (getId: () => string) => {
	const mappedIds = new Map<string, string>();

	defaultExpenseCategoryTree.forEach((category) => {
		mappedIds.set(category.id, getId());
	});

	const withRandomIds = defaultExpenseCategoryTree.map((category) => {
		const newId = mappedIds.get(category.id);

		const newParentId = category.parentId
			? mappedIds.get(category.parentId)
			: null;

		return {
			...category,
			id: newId ?? getId(),
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
  {"id":"3","labelAr":"عقد تكييف","labelEn":"AC Contract","parentId":"2","isGroup":false},
  {"id":"4","labelAr":"عقد المصعد","labelEn":"Elevator Contract","parentId":"2","isGroup":false},
  {"id":"5","labelAr":"عقد إطفاء","labelEn":"Fire Fighting Contract","parentId":"2","isGroup":false},
  {"id":"6","labelAr":"مصاريف رأس المال الأخرى","labelEn":"Other CapEx","parentId":"1","isGroup":true},
  {"id":"7","labelAr":"عزل الأسطح","labelEn":"Waterproofing","parentId":"6","isGroup":false},
  {"id":"8","labelAr":"التجديدات","labelEn":"Renovation","parentId":"6","isGroup":false},
  {"id":"9","labelAr":"الإصلاحات الكبرى","labelEn":"Major repairs","parentId":"6","isGroup":false},
  {"id":"10","labelAr":"سلامة البناء","labelEn":"Structural Integrity","parentId":"6","isGroup":false},
  {"id":"11","labelAr":"المصاريف التشغيلية","labelEn":"OpEx","parentId":null,"isGroup":true},
  {"id":"12","labelAr":"المصاريف القانونية والمالية","labelEn":"Legal & Financial","parentId":"11","isGroup":true},
  {"id":"13","labelAr":"رسوم المحاماة","labelEn":"Attorneys Fee","parentId":"12","isGroup":false},
  {"id":"14","labelAr":"التأمين","labelEn":"Insurance","parentId":"12","isGroup":false},
  {"id":"15","labelAr":"رسوم البنك","labelEn":"Bank charges","parentId":"12","isGroup":false},
  {"id":"16","labelAr":"المصاريف الحكومية","labelEn":"Government","parentId":"11","isGroup":true},
  {"id":"17","labelAr":"رسوم البلدية","labelEn":"Municipal fees","parentId":"16","isGroup":false},
  {"id":"18","labelAr":"الطوابع الحكومية","labelEn":"Government Stamps","parentId":"16","isGroup":false},
  {"id":"19","labelAr":"الأوراق الحكومية","labelEn":"Government Paperwork","parentId":"16","isGroup":false},
  {"id":"20","labelAr":"","labelEn":"Government Violations","parentId":"16","isGroup":false},
  {"id":"21","labelAr":"رواتب الحارس","labelEn":"Salaries","parentId":"11","isGroup":true},
  {"id":"22","labelAr":"أجور الحارس","labelEn":"Caretaker Wages","parentId":"21","isGroup":false},
  {"id":"23","labelAr":"إجازة الحارس","labelEn":"Caretaker Vacation leave","parentId":"21","isGroup":false},
  {"id":"24","labelAr":"معاش الحارس","labelEn":"Caretaker pension","parentId":"21","isGroup":false},
  {"id":"25","labelAr":"تأمينات الحارس وإقامته","labelEn":"Caretaker Insurance & resident permit","parentId":"21","isGroup":false},
  {"id":"26","labelAr":"خدمات الكهرباء والماء","labelEn":"Utilities","parentId":"11","isGroup":true},
  {"id":"27","labelAr":"استهلاك المياه","labelEn":"Water Consumption","parentId":"26","isGroup":false},
  {"id":"28","labelAr":"استهلاك الكهرباء","labelEn":"Electrical Consumption","parentId":"26","isGroup":false},
  {"id":"29","labelAr":"الغاز","labelEn":"Gas","parentId":"26","isGroup":false},
  {"id":"30","labelAr":"النفايات","labelEn":"Trash","parentId":"26","isGroup":false},
  {"id":"31","labelAr":"خدمات الإصلاحات","labelEn":"Repairs","parentId":"11","isGroup":true},
  {"id":"32","labelAr":"التهوية المركزية","labelEn":"Central Ventilation","parentId":"31","isGroup":false},
  {"id":"33","labelAr":"إصلاحات الطلاء","labelEn":"Paint repairs","parentId":"31","isGroup":false},
  {"id":"34","labelAr":"إصلاحات الأبواب","labelEn":"Doors repairs","parentId":"31","isGroup":false},
  {"id":"35","labelAr":"إصلاحات الزجاج","labelEn":"Glass repairs","parentId":"31","isGroup":false},
  {"id":"36","labelAr":"إصلاحات الألمنيوم","labelEn":"Aluminum repairs","parentId":"31","isGroup":false},
  {"id":"37","labelAr":"إصلاحات الجص","labelEn":"Plasterwork repairs","parentId":"31","isGroup":false},
  {"id":"38","labelAr":"إصلاحات كهربائية","labelEn":"Electrical repairs","parentId":"31","isGroup":false},
  {"id":"39","labelAr":"إصلاحات السباكة","labelEn":"Plumbing repairs","parentId":"31","isGroup":false},
  {"id":"40","labelAr":"إصلاحات الجبس","labelEn":"Gypsum repairs","parentId":"31","isGroup":false},
  {"id":"41","labelAr":"خدمات الصيانة","labelEn":"Maintenance","parentId":"11","isGroup":true},
  {"id":"42","labelAr":"صيانة الممتلكات","labelEn":"Property Maintenance","parentId":"41","isGroup":false},
  {"id":"43","labelAr":"صيانة المرافق","labelEn":"Amenities Maintenance","parentId":"41","isGroup":false},
  {"id":"44","labelAr":"صيانة الشقق","labelEn":"Apartment Maintenance","parentId":"41","isGroup":false},
  {"id":"45","labelAr":"صيانة التكييف","labelEn":"AC Maintenance","parentId":"41","isGroup":false},
  {"id":"46","labelAr":"صيانة المصاعد","labelEn":"Elevator Maintenance","parentId":"41","isGroup":false},
  {"id":"47","labelAr":"صيانة الكهرباء","labelEn":"Electrical Maintenance","parentId":"41","isGroup":false},
  {"id":"48","labelAr":"صيانة السباكة","labelEn":"Plumbing maintenance","parentId":"41","isGroup":false},
  {"id":"49","labelAr":"المصاريف الإدارية","labelEn":"Management","parentId":null,"isGroup":true},
  {"id":"50","labelAr":"رسوم الإدارة","labelEn":"Management fees","parentId":"49","isGroup":false},
  {"id":"51","labelAr":"رسوم الاشتراك","labelEn":"Subscription fees","parentId":"49","isGroup":false}
]
