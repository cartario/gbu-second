import React from 'react';
import {Input, Button, Select} from '../mui';

export default function Shedule ({name, next}){
  
  React.useEffect(()=>{
    next({
      name,
      value: {
        monday: true
        
      }
    })
  }, [])

  return (
  <div>
    <p>Расписание</p>
    <Select data={['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']} label={'День недели'} name={name} next={()=>console.log('f')}/>


  </div>)
};
