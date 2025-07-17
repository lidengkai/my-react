export type MenuItem = {
  name: React.ReactNode;
  icon?: React.ReactNode;
  auth?: number[];
} & (
  | {
      key: string;
      path?: never;
      children: MenuItem[];
    }
  | {
      key?: never;
      path: string;
      children?: never;
    }
);
