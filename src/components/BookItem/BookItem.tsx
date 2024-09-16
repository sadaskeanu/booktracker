import React, { useState } from "react";
import styles from "./BookItem.module.css";
import FormValues from "../../types/FormValues";

type Props = {
  book: FormValues;
  onDelete: (id: string) => void;
  onEdit: (updatedBook: FormValues) => void;
};

export const BookItem: React.FC<Props> = ({ book, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<FormValues>({
    id: book.id,
    title: book.title,
    author: book.author,
    pages: book.pages,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onEdit(editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      id: book.id,
      title: book.title,
      author: book.author,
      pages: book.pages,
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.bookItem}>
      {isEditing ? (
        <>
          <input
            name="title"
            value={editValues.title}
            onChange={handleChange}
          />
          <input
            name="author"
            value={editValues.author}
            onChange={handleChange}
          />
          <input
            name="pages"
            value={editValues.pages}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(book.id)}>Delete</button>
        </>
      )}
    </div>
  );
};
