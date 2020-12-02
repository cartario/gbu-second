import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import {useParams} from 'react-router-dom';
import {studios} from '../data/studios-mock';

const daysOfWeek = ['Восересенье ','Понедельник ','Вторник ','Среда ','Четверг ','Пятница ','Суббота '];

const DetailPage = () => {
  const [card, setCard] = React.useState(null);  
  const cardId = useParams().id;  

  React.useEffect(()=>{    
    //TODO fetch card by id
    
    setCard(studios.find((card)=>card.id===cardId));    
  },[]);  

  if(!card){
    return null;
  }

  return (
    <>
      <Navbar />      
      <Header title={card.title}/>
      <main className="detailPage">
        <div className="detailPage__info">          
          <h1>{card.title}</h1>
          <p>Категория: {card.type}</p>
          <p>Стоимость: {card.price==='free'? "бесплатно" : card.price}</p>        
          {/* <p>{card.description}</p> */}
          <p><a href="/schedule">Расписание:</a>           
            <span>{daysOfWeek[card.day]}</span>
            <span>{card.timeFrom}-{card.timeTo}</span>
  <p>{card.adress}</p>
  <p>группа №{card.groupNumber}</p>
          </p>
        </div>
        <img className="detailPage__img" src={card.cardUrl} alt="cardImg"/>
      </main>
      
    </>
  );
};

export default DetailPage;
