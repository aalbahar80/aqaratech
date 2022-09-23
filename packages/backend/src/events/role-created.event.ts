export class RoleCreatedEvent {
	constructor(
		public readonly roleId: string,
		public readonly senderEmail: string,
	) {}
}
