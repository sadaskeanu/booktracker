import React from "react";
import FormValues from "../../types/FormValues";

type BookshelfProps = {
  books: FormValues[];
};

const Bookshelf: React.FC<BookshelfProps> = ({ books }) => {
  const bookWidth = 50;
  const bookHeight = 70;
  const maxBooksPerShelf = 10;
  const totalWidth = 800;

  const getFontSize = (title: string, width: number): number => {
    const maxCharacters = width / 5;
    return title.length > maxCharacters ? 10 : 12;
  };

  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <svg
        width="900"
        height={books.length > maxBooksPerShelf ? 300 : 150}
        xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="100" width={totalWidth} height="10" fill="#8B4513" />

        {books.length > maxBooksPerShelf && (
          <rect x="50" y="200" width={totalWidth} height="10" fill="#8B4513" />
        )}

        {books.map((book, index) => {
          const isOnSecondShelf = index >= maxBooksPerShelf;
          const shelfIndex = index % maxBooksPerShelf;
          const numBooksOnShelf = isOnSecondShelf
            ? books.length - maxBooksPerShelf
            : Math.min(books.length, maxBooksPerShelf);
          const spacing =
            (totalWidth - numBooksOnShelf * bookWidth) / (numBooksOnShelf + 1);

          const x = 50 + spacing + shelfIndex * (bookWidth + spacing);
          const y = isOnSecondShelf ? 130 : 30;

          return (
            <g key={book.id}>
              <rect
                x={x}
                y={y}
                width={bookWidth}
                height={bookHeight}
                fill={
                  ["#FF6347", "#4682B4", "#FFD700", "#32CD32", "#FF69B4"][
                    index % 5
                  ]
                }
              />
              <text
                x={x + bookWidth / 2}
                y={y + bookHeight / 2}
                transform={`rotate(-90, ${x + bookWidth / 2}, ${
                  y + bookHeight / 2
                })`}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: `${getFontSize(book.title, bookWidth)}px`,
                  fontWeight: "bold",
                  fill: "white",
                }}>
                {book.title}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Bookshelf;
