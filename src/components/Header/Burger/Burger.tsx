import React from 'react';

import classNames from 'classnames';

import styles from './Burger.module.scss';

const Burger = ({
  toggleMenuOpen,
  menuOpen
}: {
  menuOpen: boolean;
  toggleMenuOpen: () => void;
}) => {
  return (
    <div
      className={classNames(styles.burger, {
        [styles.burger_active]: menuOpen
      })}
      aria-label="Open menu"
      onClick={toggleMenuOpen}>
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </div>
  );
};

export default Burger;
