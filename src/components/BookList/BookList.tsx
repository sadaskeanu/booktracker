import { BookItem } from "../BookItem/BookItem";
import FormValues from "../../types/FormValues";
import styles from "./BookList.module.css";

type Props = {
  books: FormValues[];
};

export const BookList = ({ books }: Props) => {
  return (
    <>
      <ul className={styles.BookList}>
        {books.map((book) => (
          <li key={book.title}>
            <BookItem key={book.id} title={book.title} author={book.author} />
          </li>
        ))}
      </ul>
    </>
  );
};
