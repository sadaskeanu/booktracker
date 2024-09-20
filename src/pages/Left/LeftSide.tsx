import React, { useState, useContext } from "react";
import { AddBookForm } from "../../components/AddBookForm/AddBookForm";
import { BookList } from "../../components/BookList/BookList";
import { BooksContext } from "../../context/BookContextProvider";
import FormValues from "../../types/FormValues";
import styles from "./LeftSide.module.css";

const LeftSide: React.FC = () => {
  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    throw new Error("LeftSide must be used within a BooksProvider");
  }

  const { books, addBook, deleteBook } = booksContext;

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addBook(formValues);
    setFormValues({ id: "", title: "", author: "", pages: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Set your reading goals, honey!</h1>
      <AddBookForm
        onChange={(value: string, field: keyof FormValues) =>
          handleChange(value, field)
        }
        onSubmit={handleSubmit}
        value={formValues}
      />
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default LeftSide;
