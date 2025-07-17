declare module '@container' {
  import React from 'react';

  export interface UserInfo {
    /** ID */
    id?: number;
    /** 角色 */
    role?: number;
    /** 用户名 */
    username?: string;
  }

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

  export const Login: () => React.JSX.Element;
  export const Layout: (props: { menu?: MenuItem[] }) => React.JSX.Element;
  export const useUserInfo: () => UserInfo;
}
