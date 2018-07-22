import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const menu = [{
    name: 'Home',
    param: '',
  }, {
    name: 'ExpensesList',
    param: 'expenses',
  }];

  return (
    <ul>
      {menu.map(({ name, param }) => (
        <li key={param}>
          <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/${param}`}>
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
