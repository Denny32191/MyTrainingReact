import React from 'react';
 import styles from './ButtonForm.module.scss'


interface ButtonProps  {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isActive?: boolean;

}

export const ButtonForm: React.FC<ButtonProps> = ({
    type = "button",
    children,
    onClick,
    isActive = false,

}) => {
    return (
      <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${isActive ? styles.active : ''}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
      {isActive && <div className={styles.buttonUnderline} />} {/* Подчеркивание */}
    </div>
  );
};