import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserDetails.module.scss";
import arrow from './../../assets/arrow.svg';
import star from "./../../assets/star.svg";
import phone from "./../../assets/phone.svg";
import { formatPhoneNumber,formatDate } from "../../utils/utils";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  userTag: string;
  department: string;
  position: string;
  birthday?: string;
  phone?: string;
}

interface UserDetailsProps {
  users: User[];
}

export const UserDetails: React.FC<UserDetailsProps> = ({ users }) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  // Находим пользователя по ID
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return <div>Страница не найдена</div>;
  }

  // Обработчик для звонка
  const handleCall = () => {
    if (user.phone) {
      window.open(`tel:${user.phone}`, "_blank");
    }
  };

  // Функция для вычисления возраста
  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
  
    // Проверяем, был ли уже день рождения в этом году
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--; 
    }
  

    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${age} лет`;
    }
    if (lastDigit === 1) {
      return `${age} год`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${age} года`;
    }
    return `${age} лет`;
  };



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.button_out}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <img src={arrow} alt="Назад" />
          </button>
        </div>
        <img src={user.avatarUrl} alt="User Avatar" className={styles.avatar} />
        <div className={styles.userIdentity}>
          <h2 className={styles.name}>{`${user.firstName} ${user.lastName}`}</h2>
          <p className={styles.userTag}>{user.userTag}</p>
        </div>
        <p className={styles.department}>{user.department}</p>
      </div>

      {/* Детали пользователя */}
      <div className={styles.details}>
        {user.birthday && (
          <div className={styles.detail__Item}>
            <div className={styles.details__info}>
            <img className={styles.details__img} src={star} alt="День рождения" />
            <span className={styles.details__value}>
            {formatDate(user.birthday)} {/* Выводим возраст */}
            </span>
            </div>
            <div className={styles.details__birthday}>
  {user.birthday && ( // Если день рождения есть, отображаем возраст
    <span>{calculateAge(user.birthday)}</span>
  )}
</div>
          </div>
        )}
        {user.phone && (
          <div className={styles.detail__contact}>
            <img className={styles.img_phone} src={phone} alt="Телефон" />
            <span className={styles.value} onClick={handleCall}>
              {formatPhoneNumber(user.phone)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
