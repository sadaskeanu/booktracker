import styles from "./BookPage.module.css";
import Layout from "../../components/Layout/Layout";
import LeftSide from "../Left/LeftSide";
import RightSide from "../Right/RightSide";
import { BooksProvider } from "../../context/BookContextProvider";

function BookPage() {
  return (
    <>
      <BooksProvider>
        <div className={`${styles.background} ${styles.mask}`}>
          <Layout L={<LeftSide />} R={<RightSide />} />
        </div>
      </BooksProvider>
    </>
  );
}

export default BookPage;
