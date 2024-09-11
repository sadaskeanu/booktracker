import { BookItem } from "../BookItem/BookItem";
import FormValues from "../../types/FormValues";
import styles from "./BookList.module.css";

type Props = {
  books: FormValues[];
  onDelete: (id: string) => void;
  // onEdit: (id: string) => void;
};

export const BookList = ({ books, onDelete }: Props) => {
  return (
    <>
      <ul className={styles.BookList}>
        {books.map((book) => (
          <li key={book.id}>
            <BookItem key={book.id} title={book.title} author={book.author} />{" "}
            {/* <button type="button" onClick={() => onEdit(book.id)}>
              edit
            </button> */}
            <button type="button" onClick={() => onDelete(book.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
