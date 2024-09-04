import { ChangeEvent } from "react";
import styles from "./Input.module.css";

type Props = {
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ value, placeholder, onChange }: Props) => {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
