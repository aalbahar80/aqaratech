import { EntityNames } from '@self/utils';

type AnyClassConstructor = {
  new (...args: any[]): any;
};

export type TIndexName = Extract<EntityNames['title'], 'tenant' | 'portfolio'>;

export class UpdateIndexEvent {
  constructor(
    // TODO add types
    public readonly items: Record<string, any>[],
    public readonly indexName: TIndexName,
    public readonly classConstructor: AnyClassConstructor,
  ) {}
}
