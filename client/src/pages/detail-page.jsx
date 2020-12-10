import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer.jsx';
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
    if(studio.name===card.name){
      acc.push({
        day: studio.day,
        timeFrom: studio.timeFrom,
        timeTo: studio.timeTo,
        groupNumber: studio.groupNumber,
        title: studio.title,
        age_min: studio.age_min,
        age_max: studio.age_max
      })
    }    
    return acc;
  },[]);

  return (
    <>
      <Navbar activeItem={"Студии"}/>      
      <Header title={card.name}/>
      <main className="detailPage">
        <div className="detailPage__info">          
          <div className="detailPage__top">
            <p><b>Адрес: {card.adress}</b></p>
            <p>Стоимость: {card.price==='free'? "бесплатно" : card.price}</p>   
            <p>Группа №{card.groupNumber}</p>                                     
            <p>Описание: {card.description}</p>
            <p>Категория: {card.type}</p>
          </div>

          <div >
            <h3><a href="/schedule">Расписание:</a></h3>
            {cardsByTitle.map((card)=>
              <div className="detailPage__day" key={card.day + card.timeFrom +card.timeTo}>
                <b><span>{daysOfWeek[card.day]}</span></b>
            <p>{card.timeFrom}-{card.timeTo}
            <span className="detailPage__day-age"> Возраст: от {card.age_min} {card.age_max ? `до ${card.age_max}`: ''} лет</span></p>
            <p>{card.title}
              <span style={{color: 'grey'}}> подгруппа: {card.groupNumber}</span>
            </p>
            
              </div>)}            
          </div>
          
        </div>
        <img className="detailPage__img" src={card.imgUrl ||"https://bayramix.ru/local/templates/bayramix_new/images/load.gif"} alt="cardImg"/>
      </main>
      
    </>
  );
};

export default DetailPage;
