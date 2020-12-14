import React from 'react';
import {useHistory} from 'react-router-dom';

const Compilation = ({studios, title})=>{
  const history = useHistory();

  const handleClickCardCompilation = (id) => {
    history.push(`/detail/${id}`);
  }
  return (
    <div className="studios__compilation">
          <h3>{title}</h3>
          <ul className="studios__compilation-list">
            {studios.map((studio)=><li key={studio.id} className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio.id)}>
              <img src={studio.imgUrl ? studio.imgUrl : "https://bayramix.ru/local/templates/bayramix_new/images/load.gif"} alt="imgStudio"/>
              <p>{studio.title} </p>
            </li>)
            }
          </ul>  
        </div>
  );
};

export default Compilation;
