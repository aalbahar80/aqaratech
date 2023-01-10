export const randomAttribution = () => {
	const n = Math.random();
	if (n < 0.3) {
		// Unspecified property
		return {
			propertyId: null,
			unitId: null,
		};
	} else if (n < 0.6) {
		// Specified property
		return {
			propertyId: null,
		};
	} else {
		// Specified unit
		return {
			unitId: null,
		};
	}
};

/** Returns constant values for a given int */
export const nonrandomAttribution = (n: number) => {
	if (n % 3 === 0) {
		// Unspecified property
		return {
			propertyId: null,
			unitId: null,
		};
	} else if (n % 3 === 1) {
		// Specified property
		return {
			propertyId: null,
		};
	} else {
		// Specified unit
		return {
			unitId: null,
		};
	}
};
