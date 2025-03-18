import React, { useEffect } from "react";
import { UserCard } from '../UserCard/UserCard';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./UserList.module.scss";
import { fetchUsers } from "../../features/MainMenu/usersSlice";
import { selectFilteredUsers } from "../../features/MainMenu/usersSelectors";
import { CriticalError } from "../CriticalError/CriticalError";
import { SearchError } from "../SearchError/SearchError";
import { UserCardSkeleton } from "../UserCardSkeleton/UserCardSkeleton";


export const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector(selectFilteredUsers); 
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);
  const filter = useAppSelector((state) => state.users.filter);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  if (loading) {
    return (
      <div className={styles.userList}>
        {Array.from({ length: 6 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <CriticalError />;
  }

  if (filteredUsers.length === 0) {
    return <SearchError />;
  }


  const formatBirthday = (birthday: string) => {
    const date = new Date(birthday);
    const day = date.getDate();
    const month = date.toLocaleString("ru", { month: "long" });

  const monthWithSuffix = month.endsWith("ь") ? month.slice(0, -1) + "я" : month + "а";

  return `${day} ${monthWithSuffix}`;
};


  const today = new Date();
  const currentYear = today.getFullYear();

  const currentYearUsers: JSX.Element[] = [];
  const nextYearUsers: JSX.Element[] = [];

  if (filter === "birthday") {
    filteredUsers.forEach((user) => {
      if (!user.birthday) return;

      const birthdayDate = new Date(user.birthday);
      birthdayDate.setFullYear(currentYear);

      if (birthdayDate < today) {
        birthdayDate.setFullYear(currentYear + 1);
      }

      const isNextYear = birthdayDate.getFullYear() > currentYear;

      const userCard = (
        <UserCard
          key={user.id}
          user={{
            ...user,
            birthday: formatBirthday(user.birthday), 
          }}
        />
      );

      if (isNextYear) {
        nextYearUsers.push(userCard);
      } else {
        currentYearUsers.push(userCard);
      }
    });
  } else {

    filteredUsers.forEach((user) => {
      const userCard = (
        <UserCard
          key={user.id}
          user={{
            ...user,
            birthday: undefined, 
          }}
        />
      );
      currentYearUsers.push(userCard);
    });
  }

  return (
    <div className={styles.userList}>
      {currentYearUsers}
      {filter === "birthday" && nextYearUsers.length > 0 && (
        <div className={styles.divider}>
          <span>{currentYear + 1}</span> 
        </div>
      )}
      {filter === "birthday" && nextYearUsers}
    </div>
  );
};