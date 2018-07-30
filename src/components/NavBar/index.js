import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'


const Navbar = () => {
  const menu = [{
    name: 'Home',
    param: '',
  }, {
    name: 'ExpensesList',
    param: 'expenses',
  }];

  return (
    <Menu>
      {menu.map(({ name, param }) => (
        <Menu.Item key={param}>
          <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/${param}`}>
            {name}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Navbar;
