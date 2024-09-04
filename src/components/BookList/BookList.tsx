import { BookItem } from "../BookItem/BookItem";
import FormValues from "../../types/FormValues";

type Props = {
  books: FormValues[];
};

export const BookList = ({ books }: Props) => {
  return (
    <>
      {books.map((book) => (
        <BookItem
          key={book.id}
          title={book.title}
          author={book.author}
          pages={book.pages}
        />
      ))}
    </>
  );
};
