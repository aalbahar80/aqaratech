import * as FusePkg from 'fuse.js';

export const search = <T>({
  data,
  q,
  keys,
}: {
  data: T[];
  q: string;
  keys: Array<keyof T>;
}): T[] => {
  console.time('fuse');
  type TFuse = typeof FusePkg['default'];
  type Config = ConstructorParameters<TFuse>['1'];
  const config: Config = {
    // type PartialConfig = Partial<TFuse['config']>;
    // const config: PartialConfig = {
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    //@ts-ignore
    keys,
  };
  const Fuse: TFuse = FusePkg as unknown as TFuse;
  const fuse = new Fuse<T>(data, config);
  const searchResults = fuse.search(q);

  const result = searchResults.map(({ item }) => item);

  // For debugging:
  //   inspect.defaultOptions.depth = null;
  //   console.log(searchResults);
  //   console.table(searchResults);
  //   console.log(
  //     `returning ${result.length} of ${data.length} results matching query ${q}.`,
  //   );

  console.timeEnd('fuse');
  return result;
};
