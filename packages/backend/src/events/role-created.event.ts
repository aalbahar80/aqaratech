export class RoleCreatedEvent {
  constructor(public readonly userId: string, public readonly email: string) {}
}
