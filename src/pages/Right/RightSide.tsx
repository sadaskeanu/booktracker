import React, { useContext } from "react";
import { TotalPages } from "../../components/TotalPages/TotalPages";
import Bookshelf from "../../components/Bookshelf/Bookshelf";
import { BooksContext } from "../../context/BookContextProvider";

const RightSide: React.FC = () => {
  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    throw new Error("RightSide must be used within a BooksProvider");
  }

  const { books } = booksContext;

  const totalPages = books.reduce(
    (total, book) => total + (Number(book.pages) || 0),
    0
  );

  return (
    <div>
      <TotalPages pages={totalPages} />
      <Bookshelf books={books} />
    </div>
  );
};

export default RightSide;
