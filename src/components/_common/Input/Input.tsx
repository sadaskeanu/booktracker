import { ChangeEvent } from "react";
import styles from "./Input.module.css";

type Props = {
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ name, value, placeholder, onChange }: Props) => {
  return (
    <input
      name={name}
      className={styles.input}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
