export interface ListProps<T> {
  data: T[];
  infoRenderer: (arg0: T, arg1: keyof T) => JSX.Element;
}
