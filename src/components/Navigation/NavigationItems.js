import React from "react";
import { Menu, Icon } from "antd";

import NavigationItem from "./NavigationItem/NavigationItem";




const navigationItems = props => {
  const items = props.navData.map((item, index) => {
    if (item.show === "always" || (item.show === "authenticated" && props.isAuthenticated) || (item.show === "not-authenticated" && !props.isAuthenticated)) {
      return (
        <Menu.Item key={index}>
          <NavigationItem link={item.link}>
            <Icon type={item.icon}/>
            <span>{item.title}</span>
          </NavigationItem>
        </Menu.Item>
      );
    }
  });
  return (
    <div>
      <Menu
        mode={props.navMode}
        theme={props.navTheme}
      >
        {items}
      </Menu>
    </div>
  );

};
export default navigationItems;
