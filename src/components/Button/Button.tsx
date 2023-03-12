import React from "react";

import classNames from "classnames";

import styles from "./Button.module.scss";
import { Loader, LoaderSize } from "../Loader/Loader";

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  color?: "green" | "white";
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  color = "green",
  loading,
  children,
  onClick,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        {
          [styles.button_disabled]: loading || disabled,
        },
        styles[`button_${color}`],
        className
      )}
      type="button"
      onClick={!loading && !disabled ? onClick : undefined}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader size={LoaderSize.s} className={styles.loader} />}
      {children}
    </button>
  );
};
