type Props = {
  title: string;
  author: string;
  pages: string;
};

export const BookItem = ({ title, author, pages }: Props) => {
  return (
    <>
      <div>
        <p>{title}</p>
        <p>{author}</p>
        <p>{pages}</p>
      </div>
    </>
  );
};
