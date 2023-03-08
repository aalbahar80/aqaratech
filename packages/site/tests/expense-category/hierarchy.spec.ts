import { describe, expect, it } from 'vitest';

import {
	ROOT_ID,
	toHeirarchy,
	toOptions,
} from '../../src/lib/utils/expense-type-options';

import { categories } from './sample';

describe('toHeirarchy', () => {
	it('should return a root node', () => {
		const root = toHeirarchy(categories);
		expect(root.data.id).toBe(ROOT_ID);
		expect(root.data.parentId).toBe(null);
		expect(root.data.labelEn).toBe('');
		expect(root.data.labelAr).toBe('');
		expect(root.data.label).toBe('');
	});

	it('should return a root node with children', () => {
		const root = toHeirarchy(categories);
		expect(root.children).toHaveLength(3);
		expect(root.descendants()).toHaveLength(52);
	});
});

describe('toOptions', () => {
	it('should return a list of options', () => {
		const options = toOptions(categories);
		expect(options).toHaveLength(51);
	});

	it('should not return a root node', () => {
		const ids = toOptions(categories).map((o) => o.value);

		expect(ids).not.toContain(ROOT_ID);
	});

	it('should return options', () => {
		const options = toOptions(categories);

		expect(options).toContainEqual({
			value: '7bb1bef7-7fe4-4dd1-9cc8-bc28a4f7f710',
			label: '          Plumbing maintenance',
			disabled: false,
		});

		expect(options).toEqual(
			expect.arrayContaining([
				{
					value: '7bb1bef7-7fe4-4dd1-9cc8-bc28a4f7f710',
					label: '          Plumbing maintenance',
					disabled: false,
				},
				{
					value: '89e92f6e-2a3f-4415-b98b-a3d25524e5f3',
					label: 'CapEx',
					disabled: true,
				},
				{
					value: 'bb65917c-a80e-41ee-9734-edd9cee82f5a',
					label: '     Annual Contracts',
					disabled: true,
				},
				{
					value: 'e23c4c2e-0752-421f-867f-42fc8edfd9c1',
					label: '          AC Contract',
					disabled: false,
				},
				{
					value: 'd4a6638b-3b0c-4154-bc03-0581e2942469',
					label: '          Elevator Contract',
					disabled: false,
				},
				{
					value: '46a5a94b-0ec5-45b1-bd2d-43eeca2b4886',
					label: '          Fire Fighting Contract',
					disabled: false,
				},
			]),
		);
	});
});
