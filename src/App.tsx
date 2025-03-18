import styles from "./App.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainMenu } from "./features/MainMenu/UsersMenu";
import { Modal } from "./features/Modal/Modal";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { RootState } from "./app/store";
import { useSelector } from "react-redux";

function App() {
  const users = useSelector((state: RootState) => state.users.users);
  return (
    <BrowserRouter basename="/MyTrainingReact">
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/user/:userId"element={<UserDetails  users={users} />} />
        </Routes>
      </div>
      <Modal />
    </BrowserRouter>
  );
}

export default App;
