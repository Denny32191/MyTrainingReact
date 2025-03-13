import React, { useEffect } from "react";
import { UserCard } from '../UserCard/UserCard';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./UserList.module.scss";
import { fetchUsers } from "../../features/MainMenu/usersSlice";
import { selectFilteredUsers } from "../../features/MainMenu/usersSelectors";
import { CriticalError } from "../CriticalError/CriticalError";
import { SearchError } from "../SearchError/SearchError";

export const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector(selectFilteredUsers); // Используем отфильтрованных пользователей
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  // Загружаем пользователей при монтировании
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Состояние загрузки
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Ошибка
  if (error) {
    return <div><CriticalError /></div>;
  }

  // Если пользователи не найдены
  if (filteredUsers.length === 0) {
    return <div><SearchError /></div>;
  }

  // Отображаем список пользователей
  return (
    <div className={styles.userList}>
      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
