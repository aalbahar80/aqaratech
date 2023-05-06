export interface SMSDirect {
	to: {
		subscriberId: string;
		phone: string;
	};
	payload: {
		link: string;
	};
}
