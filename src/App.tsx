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
        setBooks(data);
        console.log(data);
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

    console.log("Form values before submission:", {
      title: formValues.title,
      author: formValues.author,
      pages: pagesAsNumber,
    });

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

        console.log("Response from server:", data);

        if (response.ok) {
          setBooks((prevBooks) => [
            ...prevBooks,
            {
              ...formValues,
            },
          ]);

          setFormValues({ id: "", title: "", author: "", pages: "" });
        } else {
          console.error("Server error:", data.error || "Something went wrong!");
        }
      } catch (error) {
        console.error("Failed to submit the form:", error);
      }
    } else {
      console.error("Form validation failed:", {
        title: formValues.title,
        author: formValues.author,
        pages: pagesAsNumber,
      });
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
      <BookList books={books} />
      <TotalPages pages={totalPages} />
    </>
  );
}

export default App;
