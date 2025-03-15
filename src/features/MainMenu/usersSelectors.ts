import { RootState } from '../../app/store'; 




export const selectFilteredUsers = (state: RootState) => {
  const { users, filter, searchQuery } = state.users;
  const { activeButton } = state.navbar;

  // Фильтрация по роли (activeButton)
  let filteredUsers = users;
  if (activeButton !== "Все") {
    filteredUsers = users.filter((user) => {
      switch (activeButton) {
        case "Designers":
          return user.department === "design";
        case "Analysts":
          return user.department === "analytics";
        case "Managers":
          return user.department === "management";
        case "iOS":
          return user.department === "ios";
        case "Android":
          return user.department === "android";
        default:
          return true;
      }
    });
  }

  // Фильтрация по поисковому запросу
  if (searchQuery) {
    filteredUsers = filteredUsers.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  }

  // Сортировка по алфавиту или дню рождения
  if (filter === "alphabet") {
    return [...filteredUsers].sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (filter === "birthday") {
    const today = new Date();
    const currentYear = today.getFullYear();

    return [...filteredUsers].sort((a, b) => {
      if (!a.birthday || !b.birthday) return 0;

      const dateA = new Date(a.birthday);
      const dateB = new Date(b.birthday);

      // Устанавливаем год на текущий для сравнения
      dateA.setFullYear(currentYear);
      dateB.setFullYear(currentYear);

      // Если день рождения уже прошел в этом году, переносим на следующий год
      if (dateA < today) dateA.setFullYear(currentYear + 1);
      if (dateB < today) dateB.setFullYear(currentYear + 1);

      return dateA.getTime() - dateB.getTime();
    });
  }

  // Если фильтр не выбран, возвращаем отфильтрованных по роли пользователей
  return filteredUsers;
};

