import { useState } from 'react';
import React from 'react';

import { Burger } from '@components/Header/Burger';
import { Menu, links } from '@components/Header/Menu';
import bag from '@img/bag-2.svg';
import logo from '@img/logo-with-text.svg';
import user from '@img/user.svg';
import cartStore from '@store/CartStore';
import { useMediaQuery } from '@utils/helpers';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = observer(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenuOpen = () => setMenuOpen((prev) => !prev);

  const navigate = useNavigate();

  const matches = useMediaQuery('(max-width: 768px)');

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div onClick={() => navigate(`/products`)}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        {!matches ? (
          <>
            <div className={styles.links}>
              {links.map((link) => (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    classNames(styles.link, {
                      [styles.link_selected]: isActive
                    })
                  }
                  key={link.name}>
                  {link.name}
                </NavLink>
              ))}
            </div>
            <div className={styles.actionIcons}>
              <div onClick={() => navigate(`/cart`)} className={styles.iconBag}>
                <img src={bag} alt="Logo" />
                {cartStore.cartProducts.length > 0 && (
                  <div className={styles.iconBag__badge}>{cartStore.cartProducts.length}</div>
                )}
              </div>
              {/* <img src={user} alt="Logo" /> */}
            </div>
          </>
        ) : (
          <Burger menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
        )}
      </div>
      <Menu menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
    </header>
  );
});

export default Header;
