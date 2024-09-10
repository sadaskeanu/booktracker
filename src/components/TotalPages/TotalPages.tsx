type Props = {
  pages: number;
};

export const TotalPages = ({ pages }: Props) => {
  return (
    <>
      <p>Total pages: {pages}</p>
    </>
  );
};
