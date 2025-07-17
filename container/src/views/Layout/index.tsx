import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import styles from './style.less';
import classNames from 'classnames';
import { Dropdown, Layout as L, Menu, MenuProps, Modal, Space } from 'antd';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { userInfoApi, userLogoutApi } from '@/api/user';
import readMenu from '@/utils/readMenu';
import { UserInfo } from '@/type/user';
import { MenuItem } from '@/type/menu';
import context from '@/config/context';

const Layout = (props: { menu?: MenuItem[] }) => {
  const matches = useMatches();
  const navigate = useNavigate();

  const { menu } = props;

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const confirmRef = useRef<{ destroy(): void }>();

  const auth = useMemo(() => {
    if (userInfo?.role) {
      return matches.every((item) => {
        const { auth } = (item.handle || {}) as { auth: number[] };
        return auth ? auth.includes(userInfo.role!) : true;
      });
    }
    return null;
  }, [userInfo, matches]);

  const items = useMemo(
    () => (userInfo?.role ? readMenu(menu || [], userInfo.role) : []),
    [menu, userInfo]
  );

  const clickMenu = useMemoizedFn<NonNullable<MenuProps['onClick']>>((e) => {
    navigate(e.key);
  });

  const login = useMemoizedFn(async () => {
    try {
      const result = await userInfoApi();
      setUserInfo(result);
    } catch {}
  });

  const logout = useMemoizedFn(() => {
    confirmRef.current = Modal.confirm({
      content: '确认退出当前登录？',
      onOk: async () => {
        try {
          await userLogoutApi();
        } catch {}
      },
    });
  });

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    return () => {
      confirmRef.current?.destroy();
    };
  }, []);

  return (
    <context.Provider value={{ ...userInfo }}>
      <div
        className={classNames(styles.pageRoot, {
          [styles.collapsed]: collapsed,
        })}
      >
        <div className={styles.pageSider}>
          <div className={styles.logo}>
            <div className={styles.default}>Logo</div>
          </div>
          <div className={styles.content}>
            <L hasSider>
              <L.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
              >
                <Menu
                  theme="dark"
                  mode="inline"
                  className={styles.menu}
                  items={items}
                  onClick={clickMenu}
                />
              </L.Sider>
            </L>
          </div>
        </div>
        <div className={styles.pageContainer}>
          <L className={styles.content}>
            <L.Header className={styles.header}>
              <Space className={styles.right} size="middle">
                <Dropdown menu={{ items: [] }} trigger={[]}>
                  <span>{userInfo?.username}</span>
                </Dropdown>
                <LogoutOutlined onClick={logout} />
              </Space>
            </L.Header>
            <L.Content>
              {auth ? (
                <Suspense>
                  <Outlet />
                </Suspense>
              ) : null}
            </L.Content>
            <L.Footer style={{ textAlign: 'center' }}>
              ©{new Date().getFullYear()}
            </L.Footer>
          </L>
        </div>
      </div>
    </context.Provider>
  );
};

export default Layout;
