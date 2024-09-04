import { Input } from "../_common/Input/Input";
import { FormEvent, ChangeEvent } from "react";
import FormValues from "../../types/FormValues";

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
        <button type="submit">Add Book</button>
      </form>
    </>
  );
};
