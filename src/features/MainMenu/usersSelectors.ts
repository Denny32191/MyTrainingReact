import { RootState } from '../../app/store'; 




export const selectFilteredUsers = (state: RootState) => {
    const { users, filter,searchQuery } = state.users;
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
      return [...filteredUsers].sort((a, b) => {
        const dateA = a.birthday ? new Date(a.birthday).getTime() : 0;
        const dateB = b.birthday ? new Date(b.birthday).getTime() : 0;
        return dateA - dateB;
      });
    }
  
    // Если фильтр не выбран, возвращаем отфильтрованных по роли пользователей
    return filteredUsers;
  };

