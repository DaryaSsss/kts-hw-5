import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@components/Button';
import filter from '@img/filter.svg';
import { useOnClickOutside } from '@utils/helpers';
import classNames from 'classnames';

import styles from './Select.module.scss';

export type SelectOption = {
  key: number;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  value: number;
  disabled?: boolean;
  onChange: (value: SelectOption) => void;
};

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  disabled = true,
  ...props
}) => {
  const [isVisible, toggleVisible] = useState<boolean>(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => toggleVisible(false));

  return (
    <div className={styles.wrapper} ref={ref}>
      <Button
        color="white"
        className={classNames(styles.button, {
          [styles.button_disabled]: disabled
        })}
        onClick={() => toggleVisible((prev) => !prev)}>
        <img src={filter} alt="filter" className={styles.icon} />
        {value === -1 ? 'Filter' : options[value - 1].value}
      </Button>
      {isVisible && (
        <div className={styles.dropdown}>
          <div
            className={classNames(styles.dropdown__option, {
              [styles.dropdown__option_selected]: value === -1
            })}
            onClick={() => {
              onChange({ key: -1, value: 'Reset' });
              toggleVisible((prev) => !prev);
            }}>
            Reset
          </div>
          {options.map((option) => (
            <div
              className={classNames(styles.dropdown__option, {
                [styles.dropdown__option_selected]: option.key === value
              })}
              key={option.key}
              onClick={() => {
                onChange(option);
                toggleVisible((prev) => !prev);
              }}>
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
