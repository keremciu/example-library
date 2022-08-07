type KeysOfUnion<T> = T extends T ? keyof T: never;

export interface ListProps<T> {
  data: T[];
  infoRenderer: (arg0: T, arg1: KeysOfUnion<T>) => JSX.Element;
}
