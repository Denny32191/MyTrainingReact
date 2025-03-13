import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ModaFilterl.module.scss";
import { setIsOpen } from "./modalSlice";
import { RootState } from "../../app/store";
import { ModalFilter } from "./../../components/ModalFilter/ModalFilter"; // Импортируем ModalFilter

export const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const handleCloseModal =  () => {
    dispatch(setIsOpen(false));
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.modal}>
       <ModalFilter isOpen={isOpen} onClick={handleCloseModal} />
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};