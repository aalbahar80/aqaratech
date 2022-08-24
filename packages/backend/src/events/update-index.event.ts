type AnyClassConstructor = {
  new (...args: any[]): any;
};

export type TIndexName = 'tenant' | 'portfolio';

export class UpdateIndexEvent {
  constructor(
    // TODO add types
    public readonly obj: Record<string, any>,
    public readonly indexName: TIndexName,
    public readonly classConstructor: AnyClassConstructor,
  ) {}
}
