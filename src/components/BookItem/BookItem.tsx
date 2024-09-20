import React, { useState } from "react";
import FormValues from "../../types/FormValues";
// import { Input } from "../_common/Input/Input";
import styles from "./BookItem.module.css";

type Props = {
  book: FormValues;
  onDelete: (id: string) => void;
  index: number;
  // onEdit: (updatedBook: FormValues) => void;
};

export const BookItem: React.FC<Props> = ({ book, onDelete, index }) => {
  const variantClass = index % 2 === 0 ? styles.variant1 : styles.variant2;
  // const [isEditing, setIsEditing] = useState(false);
  // const [editValues, setEditValues] = useState<FormValues>({
  //   id: book.id,
  //   title: book.title,
  //   author: book.author,
  //   pages: book.pages,
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setEditValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };

  // const handleSave = () => {
  //   onEdit(editValues);
  //   setIsEditing(false);
  // };

  // const handleCancel = () => {
  //   setEditValues({
  //     id: book.id,
  //     title: book.title,
  //     author: book.author,
  //     pages: book.pages,
  //   });
  //   setIsEditing(false);
  // };

  return (
    <div className={styles.bookItem}>
      {/* {isEditing ? (
        <>
          <Input
            name="title"
            value={editValues.title}
            onChange={handleChange}
          />

          <Input
            name="author"
            value={editValues.author}
            onChange={handleChange}
          />
          <Input
            name="pages"
            value={editValues.pages}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : ( */}
      <>
        <div className={`${styles.tag} ${variantClass}`}>
          <span className={styles.title}>{book.title}</span>
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(book.id)}>
            &times;
          </button>
        </div>

        {/* <button onClick={() => setIsEditing(true)}>Edit</button> */}
      </>
      {/* )} */}
    </div>
  );
};
