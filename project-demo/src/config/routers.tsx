import React, { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/es/locale/zh_CN';
import { ROUTE_ROOT } from '@/config';
import store from '@/config/store';

const ComponentTable = lazy(
  () =>
    import(/* webpackChunkName: "ComponentTable" */ '@/views/ComponentTable')
);

const routers: RouteObject[] = [
  {
    path: ROUTE_ROOT,
    element: (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Outlet />
        </Provider>
      </ConfigProvider>
    ),
    children: [
      {
        path: 'component',
        children: [
          {
            path: 'table',
            element: <ComponentTable />,
          },
        ],
      },
    ],
  },
];

export default routers;
