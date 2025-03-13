import React, { useEffect } from "react"; // Добавляем useEffect
import styles from "./ModalFilter.module.scss";
import close from "./../../assets/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./../../features/MainMenu/usersSlice";
import { RootState } from "../../app/store";

interface ModalFilterProps {
  isOpen?: boolean;
  onClick?: (e: React.MouseEvent) => void; // Функция закрытия модального окна
}

export const ModalFilter: React.FC<ModalFilterProps> = ({
  isOpen,
  onClick,
}) => {
  const dispatch = useDispatch();
  const filterUser = useSelector((state: RootState) => state.users.filter);

  // Сброс фильтра при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      dispatch(setFilter(null)); // Сбрасываем фильтр при открытии
    }
  }, [isOpen, dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "alphabet" | "birthday" | null;
    dispatch(setFilter(value)); // Обновляем фильтр

    // Закрываем модальное окно после выбора
    if (onClick) {
      // Создаем искусственное событие MouseEvent
      const mouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }) as unknown as React.MouseEvent;

      onClick(mouseEvent); // Вызываем функцию закрытия
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__block}>
        <div className={styles.modal__content}>
          <div className={styles.modal__title}>
            <h2 className={styles.modal__text}>Сортировка</h2>
            <div className={styles.button_modal}>
              <button className={styles.button_close} onClick={onClick}>
                <img src={close} alt="" />
              </button>
            </div>
          </div>
          <div className={styles.modal__checkbox}>
            <input
              type="radio"
              name="filter"
              value="alphabet"
              checked={filterUser === "alphabet"}
              onChange={handleFilterChange}
            />
            <span>По Алфавиту</span>
          </div>
          <div className={styles.modal__checkbox}>
            <input
              type="radio"
              name="filter"
              value="birthday"
              checked={filterUser === "birthday"}
              onChange={handleFilterChange}
            />
            <span>По Дню Рождения</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;