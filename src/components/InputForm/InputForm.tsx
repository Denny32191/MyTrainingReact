import React, { ChangeEvent } from 'react';
import styles from './InputForm.module.scss';
import loop  from "./../../assets/loop.svg"
import list  from "./../../assets/list.svg"
import { useDispatch } from "react-redux";
import { setIsOpen } from "./../../features/Modal/modalSlice";
import { setSearchQuery } from '../../features/MainMenu/usersSlice';

interface InputProps {
  type: 'text' | 'number';
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm: React.FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  disabled,
  onChange,
}) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setIsOpen(true));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
    if (onChange) {
      onChange(e);
    }
  }
  return (
    <div className={styles.container}>
      <label htmlFor={label}>
        <div className={styles.inputContainer}>
          {/* Кнопка внутри инпута */}
          <button className={styles.buttonStart}>
            <img src={loop} alt="" />
          </button>

          {/* Инпут */}
          <input
            className={styles.inputs}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleSearchChange}
          />
          <button className={styles.buttonEnd} onClick={handleOpenModal}>
            <img src={list} alt="" />
          </button>
        </div>
      </label>
    </div>
  );
};