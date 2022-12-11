export const preventTabClose = (_: unknown, enabled: boolean) => {
	const handler = (e: Event) => {
			e.preventDefault();
			// @ts-expect-error not a boolean - https://developer.mozilla.org/en-US/docs/Web/API/Event/returnValue
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
