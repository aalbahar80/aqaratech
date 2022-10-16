export const formatResponseLog = ({
	response,
	url,
	method,
	start,
	extra,
}: {
	response: LoggedResponse;
	url: URL;
	method: string;
	start: number;
	extra?: Record<string, unknown>;
}) => {
	return {
		level: 'info',
		message: JSON.stringify({
			httpType: 'response',
			method,
			status: response.status,
			duration: Date.now() - start,
			pathname: url.pathname,
			url: url.href,
			...extra,
		}),
	};
};

interface LoggedResponse {
	status: number;
}
