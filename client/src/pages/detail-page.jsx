import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import {useParams, useHistory} from 'react-router-dom';
import {cards} from '../data/data';

const DetailPage = () => {
  const [card, setCard] = React.useState(null);  
  const cardId = useParams().id;
  const history = useHistory();

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
      <a href="#" onClick={()=>history.goBack()} >Назад</a>
      <div>{card.price}</div>
      <div>{card.title}</div>
      <div>{card.type}</div>
      <div>{card.description}</div>
      <img src={card.cardUrl} alt="cardImg"/>
    </>
  );
};

export default DetailPage;
