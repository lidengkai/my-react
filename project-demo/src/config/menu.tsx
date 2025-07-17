import React from 'react';
import { DatabaseOutlined, SettingOutlined } from '@ant-design/icons';
import { ROUTE_ROOT } from '@/config';
import { MenuItem } from '@container';

const menu: MenuItem[] = [
  {
    name: '组件',
    key: `${ROUTE_ROOT}/component`,
    icon: <DatabaseOutlined />,
    children: [
      {
        name: '表格',
        path: `${ROUTE_ROOT}/component/table`,
        icon: <SettingOutlined />,
      },
    ],
  },
];

export default menu;
