type AnyClassConstructor = {
  new (...args: any[]): any;
};

export class UpdateIndexEvent {
  constructor(
    // TODO add types
    public readonly obj: Record<string, any>,
    public readonly indexName: 'tenants',
    public readonly classConstructor: AnyClassConstructor,
  ) {}
}
