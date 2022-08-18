import { addToast } from '$lib/stores/toast';

interface Dataset {
	pagination: {
		hasNextPage: boolean;
	};
}

export const incompleteResultAlert = (...datasets: Dataset[]) => {
	if (datasets.some(({ pagination }) => pagination.hasNextPage)) {
		addToast({
			duration: 3000,
			props: {
				kind: 'error',
				title: 'Warning',
				subtitle:
					'Too many data points to show. Please use the filters to narrow your results.',
			},
		});
	}
};
