export interface SMSDirect {
	to: {
		subscriberId: string;
		phone: string;
	};
	payload: {
		content: string;
	};
}
