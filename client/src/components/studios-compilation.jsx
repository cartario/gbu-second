import React from 'react';
import {useHistory} from 'react-router-dom';

const Compilation = ({studios, title, visibleProps=false})=>{
  const history = useHistory();
  const [visible, setVisible] = React.useState(visibleProps);

  const handleToggleVisible = () => {
    setVisible(!visible);
  }

  const handleClickCardCompilation = (id) => {
    history.push(`/detail/${id}`);
  }
  return (
    <div className="studios__compilation">
          <h3 onClick={handleToggleVisible}>{title}--></h3>
         {visible ? 
          <ul className="studios__compilation-list">
          {studios.map((studio)=><li key={studio._id} className="studios__compilation-item" onClick={()=>handleClickCardCompilation(studio._id)}>
            <img src={studio.imgUrl ? studio.imgUrl : "https://bayramix.ru/local/templates/bayramix_new/images/load.gif"} alt="imgStudio"/>
            <p>{studio.title} </p>
          </li>)
          }
        </ul> 
         : ""} 
        </div>
  );
};

export default Compilation;
