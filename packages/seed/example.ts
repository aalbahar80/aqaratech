// Options to run this file

// 1. node --loader ts-node/esm prisma/example.ts

// The commands below require ts-node v10.7
// IMPORTANT: Check whether using local or global ts-node (versions might be different)
// https://github.com/TypeStrong/ts-node/releases/tag/v10.7.0

// 2a. ts-node-esm ./primsa/example
// 2b. ts-node-esm ./primsa/example.ts

// 3a. ts-node --esm ./primsa/example
// 3b. ts-node --esm ./primsa/example.ts

// 4a. npx ts-node-esm ./example.ts
// 4b. pnpm exec ts-node-esm ./example.ts

// TODO why does this need .js extension?
// import { expenseCategories } from '../src/lib/config/constants.js';

// const a = expenseCategories;
// const b = a?.[1] ?? 'BBB';
// const c = a[1];

// console.log(a, b, c);
import { addMonths, addDays, subDays } from "date-fns";
import ms from "ms";

const a = 1;
console.log(a);
const b = addDays(new Date(), 4);
console.log(b);
console.log(ms("1 h"));

export default a;
