import { seed } from "./seed.js";
import prisma from "./prisma.js";

seed({ sample: false, printOnly: false })
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
