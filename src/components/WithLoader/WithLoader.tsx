import React from "react";

import styles from "./WithLoader.module.scss";
import { Loader } from "../Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.center}>
          <Loader />
        </div>
      )}
      {children}
    </div>
  );
};
