import styles from "./BookItem.module.css";

type Props = {
  title: string;
  author: string;
};

export const BookItem = ({ title, author }: Props) => {
  return (
    <>
      <div className={styles.bookItem}>
        <p>Title: {title}</p>
        <p> Author: {author}</p>
      </div>
    </>
  );
};
