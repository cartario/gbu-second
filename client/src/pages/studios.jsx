import React from 'react';
import Navbar from '../components/navbar';
import Card from '../components/studioCard';
import Header from '../components/header';
import Compilation from '../components/studios-compilation';
// import {studios} from '../data/studios-mock';
import useHttp from '../hooks/http.hook';

const SHOWING_BY_CLICK = 6;

const Studios = ({studios}) => {
  const [showingCards, setShowingCards] = React.useState(6);
  // const {request, loading} = useHttp();
  // const [studiosServer, setStudiosServer] = React.useState(null);  

  const handleClickShowMore =()=>{
    setShowingCards((prev) => prev + SHOWING_BY_CLICK);
  }

  // const fetchStudios = async () => {
  //   try {
  //     const fetchedStudios = await request('/api/studios');
  //     setStudiosServer(fetchedStudios);
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }

  // React.useEffect(()=>{
  //   fetchStudios();
  // }, []);
  
  if(!studios){
    return null;
  }  

  const studiosCopy = [...studios].filter((studio)=>!studio.isDuplicate);
  const studiosKids = [...studios].filter((studio)=>!studio.isDuplicate&&studio.age_min<=6);
  const studiosDance = [...studios].filter((studio)=>(!studio.isDuplicate&&(studio.type==='dance'))||(studio.id==='15'));
  const studiosArt = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.type==='art'));
  const studiosMusic = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.type==='music'));
  const studiosSport = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.type==='sport')).reverse();
  const studiosTeenAge = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.age_min>=12&&studio.age_min<=16));
  const studiosParents = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.age_min>=18&&studio.age_min<55)); 
  
  return (
    <>  
      <Navbar/>    
      <Header title="Студии и секции"/>
      <main className="studios">         
        <div className="container">  

        <Compilation studios={studiosKids} title={'Для самых маленьких (до 6 лет):'}/>
        <Compilation studios={studiosMusic} title={'Музыка:'}/>
        <Compilation studios={studiosDance} title={'Танцы:'}/>
        <Compilation studios={studiosSport} title={'Спорт:'}/>
        <Compilation studios={studiosArt} title={'Порисовать:'}/>
        <Compilation studios={studiosTeenAge} title={'Тинэйджерам:'}/>
        <Compilation studios={studiosParents} title={'Родителям:'}/>

        <h2>ВСЕ СТУДИИ:</h2>

          <ul className="studios__list">
            {studiosCopy&&studiosCopy.slice(0,showingCards).map((card)=><li key={card.title + card._id} className="studios__item">
              <Card {...card}/>
            </li>)}            
          </ul>
        </div>
      {showingCards<=studiosCopy.length &&
      <button className="btn events__btn" onClick={handleClickShowMore}>Показать еще</button>
      }       
      </main>
      
    </>
  );
};

export default Studios;
