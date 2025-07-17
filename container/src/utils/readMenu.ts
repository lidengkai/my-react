import { MenuProps } from 'antd';
import { MenuItem } from '@/type/menu';

const readMenu = (
  menus: MenuItem[],
  role: number
): NonNullable<MenuProps['items']> => {
  return menus
    .filter((item) => {
      const { auth } = item;
      return auth ? auth.includes(role) : true;
    })
    .map((item) => {
      const { name, path, key = path || '', icon, children } = item;
      if (children) {
        return {
          key,
          label: name,
          icon,
          children: readMenu(children, role),
        };
      }
      return {
        key,
        label: name,
        icon,
      };
    });
};

export default readMenu;
