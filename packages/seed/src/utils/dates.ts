import { faker } from '@faker-js/faker';

export const timespan = 2;

// one year from now
const refDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

export const createdAt = () => faker.date.past({ years: timespan, refDate });
export const updatedAt = () => faker.date.past({ years: timespan, refDate });
