// Функция для форматирования номера телефона
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("ru-RU", { month: "long" }); // Месяц на русском
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

// Функция для форматирования номера телефона
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (
    cleaned.length === 11 &&
    (cleaned.startsWith("7") || cleaned.startsWith("8"))
  ) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)} ${cleaned.slice(
      7,
      9
    )} ${cleaned.slice(9)}`;
  }

  return phone;
};




