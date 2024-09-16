import { useState, useEffect } from "react";
import "./App.css";
import { AddBookForm } from "./components/AddBookForm/AddBookForm";
import { BookList } from "./components/BookList/BookList";
import { TotalPages } from "./components/TotalPages/TotalPages";
import FormValues from "./types/FormValues";
import Bookshelf from "./components/Bookshelf/Bookshelf";

function App() {
  const [books, setBooks] = useState<FormValues[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    id: "",
    title: "",
    author: "",
    pages: "",
  });

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

  const handleChange = (value: string, field: keyof FormValues) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pagesAsNumber = formValues.pages ? Number(formValues.pages) : 0;

    if (formValues.title && formValues.author && pagesAsNumber) {
      try {
        const response = await fetch("http://localhost:3000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formValues.title,
            author: formValues.author,
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

          setFormValues({ id: "", title: "", author: "", pages: "" });
          console.log(data.message);
        } else {
          console.error("Failed to add the book.");
        }
      } catch (error) {
        console.error("Failed to submit the form:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
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

  const handleEdit = async (updatedBook: FormValues) => {
    try {
      const response = await fetch(
        `http://localhost:3000/books/${updatedBook.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedBook.title,
            author: updatedBook.author,
            pages: Number(updatedBook.pages),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          )
        );
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error("Failed to update the book:", errorData.error);
      }
    } catch (error) {
      console.error("Failed to update the book:", error);
    }
  };

  const totalPages = books.reduce(
    (total, book) => total + (Number(book.pages) || 0),
    0
  );

  return (
    <>
      <Bookshelf books={books} />
      <AddBookForm
        onChange={(value: string, field: keyof FormValues) =>
          handleChange(value, field)
        }
        onSubmit={handleSubmit}
        value={formValues}
      />
      <BookList books={books} onDelete={handleDelete} onEdit={handleEdit} />
      <TotalPages pages={totalPages} />
    </>
  );
}

export default App;
