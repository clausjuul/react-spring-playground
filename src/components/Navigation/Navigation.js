import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';

const navData = [
  {
    to: "/",
    label: "home",
    exact: true
  },
  {
    to: "/phone",
    label: "phone",
    exact: true
  }
]

const Navigation = () => {
  return (
    <nav className={ styles.nav }>
      <ul>
        {navData.map(({to, label, exact}) => (
          <li key={label} >
            <NavLink to={{pathname: to, state: {routeIndex: 1}}} exact={exact ? true : false}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
