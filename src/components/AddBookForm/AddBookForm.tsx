import { Input } from "../_common/Input/Input";
import { FormEvent, ChangeEvent } from "react";
import FormValues from "../../types/FormValues";
import styles from "./AddBookForm.module.css";

type Props = {
  onChange: (value: string, field: keyof FormValues) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  value: FormValues;
};

export const AddBookForm = ({ onChange, onSubmit, value }: Props) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FormValues
  ) => {
    onChange(e.target.value, field);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.form}>
          <Input
            onChange={(e) => handleInputChange(e, "title")}
            value={value.title}
            placeholder="Book Title"
          />
          <Input
            onChange={(e) => handleInputChange(e, "author")}
            value={value.author}
            placeholder="Author"
          />
          <Input
            onChange={(e) => handleInputChange(e, "pages")}
            value={value.pages}
            placeholder="How many pages?"
          />
        </div>
        <button type="submit" className={styles.submit}>
          Add Book
        </button>
      </form>
    </>
  );
};
