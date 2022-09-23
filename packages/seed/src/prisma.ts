import type { PrismaClient as PrismaClientType } from '@prisma/client';
// TODO avoid ts-ignore below by fixing tsconfig.json
// @ts-ignore
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
	// log: [{ level: "query", emit: "event" }, "info", "warn", "error"],
	// errorFormat: "pretty",
}) as PrismaClientType;

// @ts-ignore
// prisma.$on("query", (e) => {
// 	console.log(e);
// });

export default prisma;
