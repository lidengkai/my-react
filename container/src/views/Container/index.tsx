import React, { useState } from 'react';
import Layout from '@/views/Layout';
import { MenuItem } from '@/type/menu';

const Container = () => {
  const [menu, setMenu] = useState<MenuItem[]>();

  return <Layout menu={menu} />;
};

export default Container;
