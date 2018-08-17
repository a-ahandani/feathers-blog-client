import React from 'react';
import { Menu, Icon } from 'antd';

import NavigationItem from './NavigationItem/NavigationItem';

const SubMenu = Menu.SubMenu;

const navigationItems = props => {
  const menuMaker = (item, index) => {
    if (
      item.show === 'always' ||
      (item.show === 'authenticated' && props.isAuthenticated) ||
      (item.show === 'not-authenticated' && !props.isAuthenticated)
    ) {
      return (
        <Menu.Item key={item.link}>
          <NavigationItem link={item.link}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </NavigationItem>
        </Menu.Item>
      );
    }
  };

  const subMenuMaker = (item, index) => {
    const menu = [];
    item.subMenu.map((m, i) => {
      menu.push(menuMaker(m, i));
    });
    const subMenu = (
      <SubMenu
        key={'menu' + index}
        title={
          <span>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </span>
        }
      >
        {menu}
      </SubMenu>
    );
    return subMenu;
  };

  const items = props.navData.map((item, index) => {
    if (item.subMenu) {
      return subMenuMaker(item, index);
    } else {
      return menuMaker(item, index);
    }
  });
  return (
    <div>
      <Menu mode={props.navMode} theme={props.navTheme}>
        {items}
      </Menu>
    </div>
  );
};
export default navigationItems;
