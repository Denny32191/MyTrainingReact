import looperror from "../../assets/looperror.svg";
import styles from "./SearchError.module.scss";

export const SearchError = () => {
  return (
    <div className={styles.container}>
        <img src={looperror} alt="Error" className={styles.image} />
        <div>
        <p className={styles.description}>Мы никого не нашли</p>
        <p className={styles.button}>Попробуй скорректировать запрос</p>
        </div>
    </div>
  );
};