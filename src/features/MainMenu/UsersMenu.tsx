import { useEffect } from "react";
import { InputForm } from "../../components/InputForm";
import { Title } from "../../components/Title/Title";
import { Navbar } from "../../components/Navbar/Navbar";
import { UserList } from "../../components/UserList/UserList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUsers } from "./usersSlice";
import {StatusMessage} from "../../components/StatusMessage/StatusMessage"

export const MainMenu = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {/* Условный рендеринг: если есть ошибка или идет загрузка, показываем StatusMessage */}
      {error || loading ? (
        <StatusMessage isLoading={loading} error={error} />
      ) : (
        <>
          <Title name="Поиск" />
          <InputForm placeholder="Введите имя,тег,почту..." type="text"/>
        </>
      )}

      {/* Остальные компоненты отображаются всегда */}
      <Navbar />
      <div>
        <UserList  />
      </div>
    </div>
  );
};
