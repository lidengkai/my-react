import React, { lazy, Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';
import { menu as demoMenus, routers as demoRouters } from '@project-demo';

const menu = [...demoMenus];
const routers = [...demoRouters];

const Login = lazy(
  () => import(/* webpackChunkName: "Login" */ '@/views/Login')
);

const Layout = lazy(
  () => import(/* webpackChunkName: "Layout" */ '@/views/Layout')
);

const router = createHashRouter([
  {
    path: 'login',
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '',
    element: (
      <Suspense>
        <Layout menu={menu} />
      </Suspense>
    ),
    children: routers,
  },
  {
    path: '*',
    element: (
      <Suspense>
        <Layout menu={menu} />
      </Suspense>
    ),
  },
]);

export default router;
