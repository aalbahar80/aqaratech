interface AsyncLoad {
	({}: any): Promise<{ props: any }>;
}
export type Props<L extends AsyncLoad> = Awaited<ReturnType<L>>['props'];
