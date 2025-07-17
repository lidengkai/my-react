import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routers from '@/config/routers';
import menu from '@/config/menu';
import { Layout, Login } from '@container';

const router = createHashRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '',
    element: <Layout menu={menu} />,
    children: routers,
  },
  {
    path: '*',
    element: <Layout menu={menu} />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
