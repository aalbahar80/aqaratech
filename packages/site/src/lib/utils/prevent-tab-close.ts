export const preventTabClose = (_: unknown, enabled: boolean) => {
	const handler = (e: any) => {
			e.preventDefault();
			e.returnValue = '';
		},
		setHandler = (shouldWork: boolean) =>
			shouldWork
				? window.addEventListener('beforeunload', handler)
				: window.removeEventListener('beforeunload', handler);
	setHandler(enabled);
	return {
		update: setHandler,
		destroy: () => setHandler(false),
	};
};
