import React, { ChangeEvent } from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value,
  className,
  onChange,
  ...props
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <input
      type="text"
      className={classNames(
        styles.input,
        { [styles.input_disabled]: props.disabled },
        className
      )}
      value={value}
      onChange={handleOnChange}
      {...props}
    />
  );
};
