import React from "react";
import { BookItem } from "../BookItem/BookItem";
import FormValues from "../../types/FormValues";
import styles from "./BookList.module.css";

type Props = {
  books: FormValues[];
  onDelete: (id: string) => void;
  onEdit: (updatedBook: FormValues) => void;
};

export const BookList: React.FC<Props> = ({ books, onDelete, onEdit }) => {
  return (
    <ul className={styles.BookList}>
      {books.map((book) => (
        <li key={book.id}>
          <BookItem book={book} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
};
