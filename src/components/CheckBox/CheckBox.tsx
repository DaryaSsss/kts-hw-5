import React, { ChangeEvent } from "react";

import classNames from "classnames";

import styles from "./CheckBox.module.scss";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.checked);
  };

  return (
    <input
      type="checkbox"
      className={classNames(styles.checkbox, {
        [styles.checkbox_disabled]: props.disabled,
      })}
      onChange={handleOnChange}
      {...props}
    />
  );
};
