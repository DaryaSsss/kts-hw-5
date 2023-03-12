import { useState } from 'react';
import React from 'react';

import { Burger } from '@components/Header/Burger';
import { Menu, links } from '@components/Header/Menu';
import bag from '@img/bag-2.svg';
import logo from '@img/logo-with-text.svg';
import user from '@img/user.svg';
import { useMediaQuery } from '@utils/helpers';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenuOpen = () => setMenuOpen((prev) => !prev);

  const matches = useMediaQuery('(max-width: 768px)');

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src={logo} alt="Logo" className={styles.logo} />
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
              <img src={bag} alt="Logo" />
              <img src={user} alt="Logo" />
            </div>
          </>
        ) : (
          <Burger menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
        )}
      </div>
      <Menu menuOpen={menuOpen} />
    </header>
  );
};

export default Header;
