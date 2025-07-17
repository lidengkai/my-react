export interface UserInfo {
  /** ID */
  id?: number;
  /** 角色 */
  role?: number;
  /** 用户名 */
  username?: string;
}

export interface LoginForm {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}
