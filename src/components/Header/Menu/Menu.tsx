import React from 'react';

import bag from '@img/bag-2.svg';
import logo from '@img/logo-with-text.svg';
import user from '@img/user.svg';
import cartStore from '@store/CartStore';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Menu.module.scss';

export const links = [
  {
    name: 'Products',
    path: '/products'
  },
  {
    name: 'Categories',
    path: '/categories'
  },
  {
    name: 'About Us',
    path: '/about'
  }
];

export const Menu = observer(
  ({ menuOpen, toggleMenuOpen }: { menuOpen: boolean; toggleMenuOpen: () => void }) => {
    const navigate = useNavigate();

    return (
      <div className={classNames(styles.menu, { [styles.menu_opened]: menuOpen })}>
        <div onClick={() => navigate(`/products`)}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        {links.map((link) => (
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              classNames(styles.link, {
                [styles.link_selected]: isActive
              })
            }
            key={link.name}
            onClick={toggleMenuOpen}>
            {link.name}
          </NavLink>
        ))}
        <div className={styles.actionIcons}>
          <div
            onClick={() => {
              navigate(`/cart`);
              toggleMenuOpen();
            }}
            className={styles.iconBag}>
            <img src={bag} alt="Logo" className={styles.actionIcons_icon} />
            {cartStore.cartProducts.length > 0 && (
              <div className={styles.iconBag__badge}>{cartStore.cartProducts.length}</div>
            )}
          </div>
          {/* <img src={user} alt="Logo" className={styles.actionIcons_icon} /> */}
        </div>
      </div>
    );
  }
);

export default Menu;
