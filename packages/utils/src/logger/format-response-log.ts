export const formatResponseLog = ({
	response,
	url,
	method,
	start,
	extra,
	level = 'http',
}: {
	level?: 'debug' | 'http' | 'info' | 'warn' | 'error';
	response: LoggedResponse;
	url: URL;
	method: string;
	start: number;
	extra?: Record<string, unknown>;
}) => {
	return {
		level,
		message: JSON.stringify({
			httpType: 'response',
			method,
			status: response.status,
			// TODO add statusText
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
