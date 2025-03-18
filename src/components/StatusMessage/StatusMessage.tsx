
import React from 'react';
import style from "./StatusMessage.module.scss";
import { Title } from "../Title";

// Определяем типы для пропсов
interface StatusMessageProps {
    isLoading: boolean;
    error: string | null;
  }
  
  export const StatusMessage: React.FC<StatusMessageProps> = ({ isLoading, error }) => {
    const containerClass = `${style.container} ${
      error ? style.error : isLoading ? style.loading : ""
    }`;
  
    return (
      <div className={containerClass}>
        <Title name="Поиск" />
        {error ? (
          <p className={style.error__text}>Не могу обновить данные. Проверь соединение с интернетом.</p>
        ) : isLoading ? (
          <p className={style.error__text}>Секундочку, гружусь...</p>
        ) : null}
      </div>
    );
  };
  
  export default StatusMessage;