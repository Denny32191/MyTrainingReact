import React, { ChangeEvent, useCallback, useEffect } from 'react';
import styles from './InputForm.module.scss';
import loop from './../../assets/loop.svg';
import list from './../../assets/list.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from './../../features/Modal/modalSlice';
import { setInputValue, setSearchQuery } from '../../features/MainMenu/usersSlice';
import debounce from 'lodash.debounce';
import { RootState } from '../../app/store';

interface InputProps {
  type: 'text' | 'number';
  label?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm: React.FC<InputProps> = ({
  type,
  label,
  name,
  placeholder,
  disabled,
  onChange,
}) => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) => state.users.inputValue); 


  const debouncedUpdateSearchQuery = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query)); 
    }, 500),
    [dispatch]
  );


  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(setInputValue(query)); 
    debouncedUpdateSearchQuery(query);
    if (onChange) {
      onChange(e);
    }
  };


  useEffect(() => {
    return () => {
      debouncedUpdateSearchQuery.cancel();
    };
  }, [debouncedUpdateSearchQuery]);

  const handleOpenModal = () => {
    dispatch(setIsOpen(true));
  };

  return (
    <div className={styles.container}>
    <label htmlFor={label}>
      <div className={styles.inputContainer}>

        <button className={styles.buttonStart}>
          <img src={loop} alt="" />
        </button>


        <input
          className={styles.inputs}
          type={type}
          value={inputValue}
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