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

export const adapterPage1 = (data) => {
  return {
    title: Object.values(data.title)[0] || '',
    afisha: Object.values(data.afisha)[0] || '',
    projects: Object.keys(data.projects).map((key)=>{
      return {
        id: key,
        ...data.projects[key]
      }
    }) || [],
    studios: Object.keys(data.studios).map((key)=>{
      return {
        id: key,
        ...data.studios[key]
      }
    }) || [],
    teachers: Object.keys(data.teachers).map((key)=>{
      return {
        id: key,
        ...data.teachers[key]
      }
    }) || [],
  };
};

export const adapterPage2 = (data) => {
  return {
    info: Object.values(data.info)[0] || {},    
    items: Object.keys(data.items).map((key)=>{
      return {
        id: key,
        ...data.items[key]
      }
    }) || []
  };
};

export const adapterCreatePage = (data) => {
  return {
       
    items: Object.keys(data).map((key)=>{
      return {
        id: key,
        ...data[key]
      }
    }) || []
  };
};
