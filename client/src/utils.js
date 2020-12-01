export const sayWelcome = () => {
  const date = new Date();
  const hours = date.getHours();

  if(hours >=0 & hours<6){
    return 'Доброй ночи!'
  }
  if(hours >=6 & hours<12){
    return 'Доброе утро!'
  }
  if(hours >=12 & hours<18){
    return 'Добрый день!'
  }
  if(hours >=18 & hours<22){
    return 'Добрый вечер!'
  }
  return 'Доброй ночи!'
};
