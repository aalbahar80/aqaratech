export const formatRequestLog = ({
	request,
	url,
	extra,
}: {
	request: LoggedRequest;
	url: URL;
	extra?: Record<string, unknown>;
}) => {
	return {
		level: 'http',
		message: JSON.stringify({
			httpType: 'request',
			method: request.method,
			pathname: url.pathname,
			url: url.href,
			...extra,
		}),
	};
};

interface LoggedRequest {
	method: string;
}
