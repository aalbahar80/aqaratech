const PUBLIC_FOREIGN_FIELDS = ['Property', 'Unit', 'Lease', 'LeaseInvoice'];

export const getErrorMessage = (rawFieldName: string) => {
	// Example rawFieldName: "Property_portfolioId_fkey (index)"
	// Example message: "Unable to delete portfolio. Please delete any property associated with this portfolio before attempting to delete the portfolio."

	const main = rawFieldName.split('_')[1]?.replace('Id', '').toLowerCase();

	let foreign = rawFieldName.split('_')[0];

	if (!foreign || !main) {
		console.warn(
			`Unable to compute a helpful error message for ${rawFieldName}`,
		);
		return '';
	}

	if (!PUBLIC_FOREIGN_FIELDS.includes(foreign)) {
		// Only certain violations should expose the foreign key name to the user.
		return '';
	}

	if (foreign === 'LeaseInvoice') {
		foreign = 'invoice';
	} else {
		foreign = foreign.toLowerCase();
	}

	const result = `Unable to delete ${main}. Please delete any ${foreign} associated with this ${main} before attempting to delete the ${main}.`;
	console.log(result, '---------------------------------');

	return result;
};
