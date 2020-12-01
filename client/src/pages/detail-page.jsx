import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import {useParams} from 'react-router-dom';
import {cards} from '../data/data';

const daysOfWeek = ['Восересенье ','Понедельник ','Вторник ','Среда ','Четверг ','Пятница ','Суббота '];

const DetailPage = () => {
  const [card, setCard] = React.useState(null);  
  const cardId = useParams().id;  

  React.useEffect(()=>{    
    //TODO fetch card by id
    setCard(cards.find((card)=>card.id===Number(cardId)));    
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
          <p>{card.description}</p>
          <p><a href="/schedule">Расписание:</a>
            <span>{card.repeatDays.map((day)=>daysOfWeek[day])}</span>
            <span>{card.timeFrom}-{card.timeTo}</span>
          </p>
        </div>
        <img className="detailPage__img" src={card.cardUrl} alt="cardImg"/>
      </main>
      
    </>
  );
};

export default DetailPage;
