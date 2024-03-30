export type TChildrenNav = {
  label: string;
  path: string;
};

export type TNavigation<T, TChildrenNav> = {
  label: T;
  children: TChildrenNav[];
};
