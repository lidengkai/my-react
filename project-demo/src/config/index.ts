export interface ApiType {
  api: string;
}

/** 开发环境 */
const dev: ApiType = {
  api: '/api',
};

/** 调试 */
const watch = {
  ...dev,
};

/** 接口 */
export const API: ApiType =
  process.env.NODE_ENV === 'production' ? APP_API : watch;

export const ROUTE_ROOT = '/demo';
