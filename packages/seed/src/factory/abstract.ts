import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { createdAt, updatedAt } from '../utils/dates';

export const abstractFactory = Factory.Sync.makeFactory({
	id: Factory.Sync.each(() => randomUUID()),
	createdAt: Factory.Sync.each(() => createdAt()),
	updatedAt: Factory.Sync.each(() => updatedAt()),
});
