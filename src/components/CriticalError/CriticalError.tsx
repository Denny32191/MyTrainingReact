import flying from "../../assets/flying.svg";
import styles from "./CriticalError.module.scss";

export const CriticalError = () => {
  return (
    <div className={styles.container}>
        <img src={flying} alt="Error" className={styles.image} />
        <div>
        <h3 className={styles.title}>Какой-то сверхразум все сломал</h3>
        <p className={styles.description}>Постараемся быстро починить</p>
        <button className={styles.button}>Попробовать снова</button>
        </div>
    </div>
  );
};