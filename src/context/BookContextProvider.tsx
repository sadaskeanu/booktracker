import React, { createContext, useState, useEffect } from "react";
import FormValues from "../types/FormValues";

interface BooksContextProps {
  books: FormValues[];
  addBook: (book: FormValues) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

export const BooksContext = createContext<BooksContextProps | undefined>(
  undefined
);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<FormValues[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        setBooks(
          data.map((book: any) => ({
            id: String(book.id),
            title: book.title,
            author: book.author,
            pages: String(book.pages),
          }))
        );
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (newBook: FormValues) => {
    try {
      const pagesAsNumber = newBook.pages ? Number(newBook.pages) : 0;

      if (newBook.title && newBook.author && pagesAsNumber) {
        const response = await fetch("http://localhost:3000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newBook.title,
            author: newBook.author,
            pages: pagesAsNumber,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setBooks((prevBooks) => [
            ...prevBooks,
            {
              id: String(data.book.id),
              title: data.book.title,
              author: data.book.author,
              pages: String(data.book.pages),
            },
          ]);
          console.log(data.message);
        } else {
          console.error("Failed to add the book.");
        }
      }
    } catch (error) {
      console.error("Failed to submit the form:", error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        console.log(`Book with id ${id} deleted`);
      } else {
        console.error("Failed to delete the book.");
      }
    } catch (error) {
      console.error("Failed to delete the book:", error);
    }
  };

  return (
    <BooksContext.Provider value={{ books, addBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
};
