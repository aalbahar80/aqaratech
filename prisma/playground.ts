import pkg from '@prisma/client';
// import { DataFrame } from 'danfojs-node';
import * as dfd from 'danfojs-node';

const { PrismaClient } = pkg;
const prisma = new PrismaClient({});

async function main() {
	// FILTERS
	const clientId = '139d84db-1b44-4829-a422-5573c24adea9';

	// const start = new Date('2021-01-01');
	// const end = new Date('2021-04-31');
	// const start = new Date(Date.UTC(2021, 0, 31));
	// const end = new Date(Date.UTC(2021, 3, 31));
	const start = new Date(2021, 0, 1);
	const end = new Date(2021, 3, 31);

	const propertyId = 'ed082329-c4d5-453b-98c0-865d2b94daa5';
	// const propertyId = '';

	const data = await prisma.transaction.findMany({
		where: {
			postDate: {
				gte: start,
				lte: end,
			},
			lease: {
				unit: propertyId
					? {
							propertyId,
					  }
					: {
							property: {
								clientId,
							},
					  },
			},
		},
		select: {
			id: true,
			postDate: true,
			isPaid: true,
			amount: true,
		},
	});
	console.log({ data }, 'playground.ts ~ 37');

	// let df = new dfd.DataFrame(data, { config: { tableMaxRow: 100 } });
	// df.print();
	// console.log(df);
	// df = df.asType('postDate', 'string');
	// const ds = df.asType('postDate', 'string').column('postDate').dt.monthName();
	// // const df2: dfd.DataFrame = dfd.concat({ dfList: [df, ds], axis: 1 });
	// df = df.addColumn('month', ds);
	// df.print();

	// const groupedDf = df.groupby(['month']);
	// // const groupedDf = df.groupby(['month', 'isPaid']);
	// groupedDf.col(['amount']).sum().print();
	// df.applyMap(console.log);
}
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
