import { useState } from "react";
import "./App.css";
import { AddBookForm } from "./components/AddBookForm/AddBookForm";
import { BookList } from "./components/BookList/BookList";
import FormValues from "./types/FormValues";

function App() {
  const [books, setBooks] = useState<FormValues[]>([]);

  const [formValues, setFormValues] = useState<FormValues>({
    id: "",
    title: "",
    author: "",
    pages: "",
  });

  const handleChange = (value: string, field: keyof FormValues) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.title && formValues.author && formValues.pages) {
      setBooks((prevBooks) => [
        ...prevBooks,
        { ...formValues, id: new Date().toISOString() },
      ]);

      setFormValues({ id: "", title: "", author: "", pages: "" });
    }
  };

  return (
    <>
      <AddBookForm
        onChange={(value: string, field: keyof FormValues) =>
          handleChange(value, field)
        }
        onSubmit={handleSubmit}
        value={formValues}
      />
      <BookList books={books} />
    </>
  );
}

export default App;
