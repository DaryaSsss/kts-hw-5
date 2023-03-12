import React, { useState } from "react";

import classNames from "classnames";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const pickOption = (option: Option) => {
    if (!disabled) {
      const i = value.findIndex((o) => o.key === option.key);
      if (i === -1) {
        onChange([...value, option]);
      } else {
        onChange([...value.slice(0, i), ...value.slice(i + 1)]);
      }
    }
  };

  const pluralizedOptions = pluralizeOptions(value);

  const toggleDropdown = () => {
    if (!disabled) {
      const visible = !dropdownVisible;
      setDropdownVisible(visible);
    }
  };

  return (
    <div
      className={classNames(
        styles.multiDropdown,
        {
          [styles.multiDropdown_disbaled]: disabled,
        },
        { [styles.multiDropdown_visible]: dropdownVisible }
      )}
    >
      <div
        onClick={toggleDropdown}
        className={classNames(
          {
            [styles.multiDropdown_placeholder]: value.length === 0,
          },
          {
            [styles.multiDropdown_placeholder_visible]: dropdownVisible,
          }
        )}
      >
        {pluralizedOptions}
      </div>
      {dropdownVisible && !disabled && (
        <div className={classNames(styles.multiDropdown_list)}>
          {options.map((option) => (
            <div
              key={option.key}
              className={classNames(styles.multiDropdown_option, {
                [styles.multiDropdown_option_selected]: value.find(
                  (o) => o.key === option.key
                ),
              })}
              onClick={() => pickOption(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
