import { useSelector } from "react-redux";
import styles from "./UserCard.module.scss";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../app/store";

interface User {
    id: string;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    userTag: string;
    department: string;
    position: string;
    birthday?: string;
    phone?: string;
}

interface UserCardProps {
    user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const navigate = useNavigate();
    const filter = useSelector((state: RootState) => state.users.filter); // Получаем текущий фильтр
  
    const handleClick = () => {
      navigate(`/user/${user.id}`);
    };
  
    return (
      <div className={styles.userCard} onClick={handleClick}>
        <div className={styles.avatarContainer}>
          <img
            src={user.avatarUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <div className={styles.nameContainer}>
              <span className={styles.firstName}>{`${user.firstName} ${user.lastName}`}</span>
              <span className={styles.userTag}>{user.userTag}</span>
            </div>
            <span className={styles.userRole}>{user.position}</span>
          </div>
        </div>
        {/* Выносим дату рождения на уровень с avatarContainer */}
        {filter === "birthday" && user.birthday && (
          <div className={styles.userBirthday}>{user.birthday}</div>
        )}
      </div>
    );
  };