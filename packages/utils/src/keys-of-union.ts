// https://stackoverflow.com/a/49402091/9689661
export type KeysOfUnion<T> = T extends T ? keyof T : never;
