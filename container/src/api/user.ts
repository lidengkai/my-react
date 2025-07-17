import request from '@/utils/request';
import { LoginForm, UserInfo } from '@/type/user';

/** 用户信息 */
export const userInfoApi = async () => {
  const res = await request<UserInfo>({
    url: 'user/info',
    method: 'get',
  });
  const { id, role, username } = res || {};
  return {
    id: id,
    role: role,
    username: username,
  };
};

/** 用户登录 */
export const userLoginApi = async (data: LoginForm) => {
  await request({
    url: 'user/login',
    method: 'post',
    data,
  });
  return true;
};

/** 登出 */
export const userLogoutApi = async () => {
  await request({
    url: 'user/logout',
    method: 'get',
  });
  return true;
};
