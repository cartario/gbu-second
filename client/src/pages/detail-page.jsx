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
  },[cardId]);

  if(!card){
    return null;
  }

  const cardsByTitle = studios.reduce((acc, studio)=>{
    if(studio.title===card.title){
      acc.push({
        day: studio.day,
        timeFrom: studio.timeFrom,
        timeTo: studio.timeTo,
        groupNumber: studio.groupNumber,
      })
    }    
    return acc;
  },[]);

  return (
    <>
      <Navbar />      
      <Header title={card.title}/>
      <main className="detailPage">
        <div className="detailPage__info">          
          {/* <h1>{card.title}</h1> */}
          <p>Адрес: {card.adress}</p>
          <p>Группа №{card.groupNumber}</p> 
          <p>Возраст: от {card.age_min} {card.age_max ? `до ${card.age_max}`: ''} лет</p>          
          <p>Стоимость: {card.price==='free'? "бесплатно" : card.price}</p>                
          <p>Описание: {card.description}</p>


          <div><a href="/schedule">Расписание:</a>
          {cardsByTitle.map((card)=>
            <div key={card.day + card.timeFrom +card.timeTo}>
              <b><span>{daysOfWeek[card.day]}</span></b>
          <span>{card.timeFrom}-{card.timeTo}</span><span style={{color: "grey"}}> подгруппа: {card.groupNumber}</span>
            </div>)}            
            
          </div>
          <p>Категория: {card.type}</p>
        </div>
        <img className="detailPage__img" src={card.cardUrl ||"https://bayramix.ru/local/templates/bayramix_new/images/load.gif"} alt="cardImg"/>
      </main>
      
    </>
  );
};

export default DetailPage;
