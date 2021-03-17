export const sayWelcome = () => {
  const date = new Date();
  const hours = date.getHours();

  if(hours >=0 & hours<6){
    return {name: 'Доброй ночи!', status: 0}
  }
  if(hours >=6 & hours<12){
    return {name: 'Доброе утро!', status: 1}
  }
  if(hours >=12 & hours<18){
    return {name: 'Добрый день!', status: 2}
  }
  if(hours >=18 & hours<22){
    return {name: 'Добрый вечер!', status: 3}
  }
  return {name: 'Доброй ночи!', status: 0}
};

export const adapterContactPage = (data) => {
  return {
    items: {
      members:
        Object.keys(data.items.members).map((key) => {
          return {
            id: key,
            ...data.items.members[key],
          };
        }) || [],
      contacts: Object.values(data.items.contacts)[0] || {},      
      social: Object.keys(data.items.social).map((key)=> {
        return {
          id: key,
          ...data.items.social[key]
        }
      }) || []
    },
  };
};
