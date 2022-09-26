import { faker } from '@faker-js/faker';

export const timespan = 2;
export const createdAt = () => faker.date.past(timespan);
export const updatedAt = () => faker.date.past(timespan);
