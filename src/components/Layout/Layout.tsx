import { ReactNode } from "react";
import styles from "./Layout.module.css";

type Props = {
  L?: ReactNode;
  R?: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.leftSide}>{props.L}</div>
        <div className={styles.rightSide}>{props.R}</div>
      </div>
    </>
  );
};

export default Layout;
