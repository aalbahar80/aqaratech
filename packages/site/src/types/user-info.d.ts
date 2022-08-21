// TODO rm/use
// https://github.com/sveltejs/kit/issues/5951
interface UserInfo {
	user: Readonly<import('$models/types/auth.type').User> | undefined;
	accessToken: string;
	/**
	 * Whether the user is authenticated. This is different from `user` being defined.
	 * When a user first signs up in auth0 and redirected to the app, `user` is undefined but `isAuthenticated` is true.
	 */
	isAuthenticated: boolean;
}
