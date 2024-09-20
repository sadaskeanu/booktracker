import { BookItem } from "../BookItem/BookItem";
import FormValues from "../../types/FormValues";
import styles from "./BookList.module.css";

type Props = {
  books: FormValues[];
  onDelete: (id: string) => void;
};

export const BookList: React.FC<Props> = ({ books, onDelete }) => {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.BookList}>
          {books.map((book, index) => (
            <li key={book.id}>
              <BookItem book={book} onDelete={onDelete} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
