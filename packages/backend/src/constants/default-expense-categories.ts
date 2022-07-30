import { ExpenseCategory } from 'src/organizations/dto/expenseCategory.dto';

// prettier-ignore
export const defaultExpenseCategoryTree = [
	{ id: '1', labelEn: 'CapEx', labelAr: 'المصاريف الرأسمالية', parentId: null },
	{ id: '2', labelEn: 'Annual Contracts', labelAr: 'عقود الصيانة السنوية', parentId: "1" },
	{ id: '3', labelEn: 'AC Contract', labelAr: '', parentId: "2" },
	{ id: '4', labelEn: 'Elevator Contract', labelAr: '', parentId: "2" },
	{ id: '5', labelEn: 'Fire Fighting Contract', labelAr: '', parentId: "2" },
	{ id: '6', labelEn: 'Other CapEx', labelAr: '', parentId: "1" },
	{ id: '7', labelEn: 'Waterproofing', labelAr: '', parentId: "6" },
	{ id: '8', labelEn: 'Renovation', labelAr: '', parentId: "6" },
	{ id: '9', labelEn: 'Major repairs', labelAr: '', parentId: "6" },
	{ id: '10', labelEn: 'Structural Integrity', labelAr: '', parentId: "6" },
	{ id: '11', labelEn: 'OpEx', labelAr: 'المصاريف التشغيلية', parentId: null },
	{ id: '12', labelEn: 'Legal & Financial', labelAr: 'المصاريف القانونية', parentId: "11" },
	{ id: '13', labelEn: 'Attorneys Fee', labelAr: '', parentId: "12" },
	{ id: '14', labelEn: 'Insurance', labelAr: '', parentId: "12" },
	{ id: '15', labelEn: 'Bank charges', labelAr: '', parentId: "12" },
	{ id: '16', labelEn: 'Government', labelAr: 'المصاريف الحكومية', parentId: "11" },
	{ id: '17', labelEn: 'Municipal fees', labelAr: '', parentId: "16" },
	{ id: '18', labelEn: 'Government Stamps', labelAr: '', parentId: "16" },
	{ id: '19', labelEn: 'Government Paperwork', labelAr: '', parentId: "16" },
	{ id: '20', labelEn: 'Government Violations', labelAr: '', parentId: "16" },
	{ id: '21', labelEn: 'Salaries', labelAr: 'رواتب الحارس', parentId: "11" },
	{ id: '22', labelEn: 'Caretaker Wages', labelAr: '', parentId: "21" },
	{ id: '23', labelEn: 'Caretaker Vacation leave', labelAr: '', parentId: "21" },
	{ id: '24', labelEn: 'Caretaker pension', labelAr: '', parentId: "21" },
	{ id: '25', labelEn: 'Caretaker Insurance & resident permit', labelAr: '', parentId: "21" },
	{ id: '26', labelEn: 'Utilities', labelAr: 'خدمات الكهرباء والماء', parentId: "11" },
	{ id: '27', labelEn: 'Water Consumption', labelAr: '', parentId: "26" },
	{ id: '28', labelEn: 'Electrical Consumption', labelAr: '', parentId: "26" },
	{ id: '29', labelEn: 'Gas', labelAr: '', parentId: "26" },
	{ id: '30', labelEn: 'Trash', labelAr: '', parentId: "26" },
	{ id: '31', labelEn: 'Repairs', labelAr: 'خدمات الإصلاحات', parentId: "11" },
	{ id: '32', labelEn: 'Central Ventilation', labelAr: '', parentId: "31" },
	{ id: '33', labelEn: 'Paint repairs', labelAr: '', parentId: "31" },
	{ id: '34', labelEn: 'Doors repairs', labelAr: '', parentId: "31" },
	{ id: '35', labelEn: 'Glass repairs', labelAr: '', parentId: "31" },
	{ id: '36', labelEn: 'Aluminum repairs', labelAr: '', parentId: "31" },
	{ id: '37', labelEn: 'Plasterwork repairs', labelAr: '', parentId: "31" },
	{ id: '38', labelEn: 'Electrical repairs', labelAr: '', parentId: "31" },
	{ id: '39', labelEn: 'Plumbing repairs', labelAr: '', parentId: "31" },
	{ id: '40', labelEn: 'Gypsum repairs', labelAr: '', parentId: "31" },
	{ id: '41', labelEn: 'Maintenance', labelAr: 'خدمات الصيانة', parentId: "11" },
	{ id: '42', labelEn: 'Property Maintenance', labelAr: '', parentId: "41" },
	{ id: '43', labelEn: 'Amenities Maintenance', labelAr: '', parentId: "41" },
	{ id: '44', labelEn: 'Apartment Maintenance', labelAr: '', parentId: "41" },
	{ id: '45', labelEn: 'AC Maintenance', labelAr: '', parentId: "41" },
	{ id: '46', labelEn: 'Elevator Maintenance', labelAr: '', parentId: "41" },
	{ id: '47', labelEn: 'Electrical Maintenance', labelAr: '', parentId: "41" },
	{ id: '48', labelEn: 'Plumbing maintenance', labelAr: '', parentId: "41" },
	{ id: '49', labelEn: 'Management', labelAr: 'المصاريف الإدارية', parentId: null },
	{ id: '50', labelEn: 'Management fees', labelAr: '', parentId: "49" },
	{ id: '51', labelEn: 'Subscription fees', labelAr: '', parentId: "49" },
];
