import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let books = [];

app.post("/submit", (req, res) => {
  console.log("Received POST request data:", req.body);

  const { title, author, pages } = req.body;

  if (title && author && pages) {
    const newBook = {
      id: books.length + 1,
      title: title,
      author: author,
      pages: Number(pages),
    };

    console.log("New book added:", newBook);

    books.push(newBook);
    console.log("Updated books array:", books);

    res
      .status(201)
      .json({ message: "Book added successfully!", book: newBook });
  } else {
    console.error("Invalid data received:", { title, author, pages });
    res.status(400).json({
      error: "Invalid form data. Title, author, and pages are required.",
    });
  }
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex((book) => book.id === parseInt(id, 10));

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book deleted successfully" });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
