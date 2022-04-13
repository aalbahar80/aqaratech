export const protectRoute = (session: App.Session, pathname: string) => {
	const signinUrl = '/login';
	return pathname !== signinUrl && !session.user
		? {
				redirect: signinUrl,
				status: 302,
		  }
		: {};
};
