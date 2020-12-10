import React from 'react';
import {useHistory} from 'react-router-dom';
import Navbar from '../components/navbar';
import Card from '../components/studioCard';
import Header from '../components/header';
import Footer from '../components/footer.jsx';
import {studios} from '../data/studios-mock';

const SHOWING_BY_CLICK = 6;

const Studios = () => {
  const [showingCards, setShowingCards] = React.useState(6);
  const history = useHistory();

  const studiosCopy = [...studios].filter((studio)=>!studio.isDuplicate);

  const studiosKids = [...studios].filter((studio)=>!studio.isDuplicate&&studio.age_min<=6);
  const studiosDance = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.type==='dance')||(studio.id==='15'));
  const studiosArt = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.type==='art'));
  const studiosMusic = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.type==='music'));
  const studiosSport = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.type==='sport')).reverse();
  const studiosTeenAge = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.age_min>=12&&studio.age_min<=16));
  const studiosParents = [...studios].filter((studio)=>!studio.isDuplicate&&(studio.age_min>=18&&studio.age_min<55));

  const handleClickShowMore =()=>{
    setShowingCards((prev) => prev + SHOWING_BY_CLICK);
  }

  const handleClickCardCompilation = (id) => {
    history.push(`/detail/${id}`);
  }
  
  return (
    <>      
      <Header title="Студии и секции"/>
      <main className="studios">         
        <div className="container"> 

        <div className="studios__compilation">
          <h3>Для самых маленьких (до 6 лет):</h3>
          <ul className="studios__compilation-list">
            {studiosKids.map((studio)=><li className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio.id)}>
              <img src={studio.imgUrl} alt="imgStudio"/>
              <p>{studio.title} </p>
            </li>)
            }
          </ul>  
        </div>

        <div className="studios__compilation">
          <h3>Музыка:</h3>
          <ul className="studios__compilation-list">
            {studiosMusic.map((studio)=><li className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio.id)}>
              <img src={studio.imgUrl} alt="imgStudio"/>
              <p>{studio.title} </p>
            </li>)
            }
          </ul>  
        </div>

        <div className="studios__compilation">
          <h3>Танцы:</h3>
          <ul className="studios__compilation-list">
            {studiosDance.map((studio)=><li className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio.id)}>
              <img src={studio.imgUrl} alt="imgStudio"/>
              <p>{studio.title} </p>
            </li>)
            }
          </ul>  
        </div>

        <div className="studios__compilation">
          <h3>Спорт:</h3>
          <ul className="studios__compilation-list">
            {studiosSport.map((studio)=><li className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio.id)}>
              <img src={studio.imgUrl} alt="imgStudio"/>
              <p>{studio.title} </p>
            </li>)
            }
          </ul>  
        </div>

        <div className="studios__compilation">
          <h3>Порисовать:</h3>
          <ul className="studios__compilation-list">
            {studiosArt.map((studio)=><li className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio.id)}>
              <img src={studio.imgUrl} alt="imgStudio"/>
              <p>{studio.title} </p>
            </li>)
            }
          </ul>  
        </div>

        <div className="studios__compilation">
          <h3>Тинэйджерам:</h3>
          <ul className="studios__compilation-list">
            {studiosTeenAge.map((studio)=><li className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio.id)}>
              <img src={studio.imgUrl} alt="imgStudio"/>
              <p>{studio.title} </p>
            </li>)
            }
          </ul>  
        </div>

        <div className="studios__compilation">
          <h3>Родителям:</h3>
          <ul className="studios__compilation-list">
            {studiosParents.map((studio)=><li className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio.id)}>
              <img src={studio.imgUrl} alt="imgStudio"/>
              <p>{studio.title} </p>
            </li>)
            }
          </ul>  
        </div>

        

        <h3>Все студии:</h3>

          <ul className="studios__list">
            {studiosCopy&&studiosCopy.slice(0,showingCards).map((card)=><li key={card.title + card.id} className="studios__item">
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
