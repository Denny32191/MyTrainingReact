import React from 'react';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { setActiveButton } from './navbarSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks'; 
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeButton = useAppSelector((state) => state.navbar.activeButton);

  return (
    <div className={styles.container}>
      <div className={styles.buttonsWrapper}>
        <ButtonForm
          isActive={activeButton === 'Все'}
          onClick={() => dispatch(setActiveButton('Все'))}
        >
          Все
        </ButtonForm>
        <ButtonForm
          isActive={activeButton === 'Designers'}
          onClick={() => dispatch(setActiveButton('Designers'))}
        >
          Designers
        </ButtonForm>
        <ButtonForm
          isActive={activeButton === 'Analysts'}
          onClick={() => dispatch(setActiveButton('Analysts'))}
        >
          Analysts
        </ButtonForm>
        <ButtonForm
          isActive={activeButton === 'Managers'}
          onClick={() => dispatch(setActiveButton('Managers'))}
        >
          Managers
        </ButtonForm>
        <ButtonForm
          isActive={activeButton === 'iOS'}
          onClick={() => dispatch(setActiveButton('iOS'))}
        >
          iOS
        </ButtonForm>
        <ButtonForm
          isActive={activeButton === 'Android'}
          onClick={() => dispatch(setActiveButton('Android'))}
        >
          Android
        </ButtonForm>
      </div>

      <div className={styles.underlineContainer}>
        <div
          className={styles.underline}
        />
      </div>
    </div>
  );
};