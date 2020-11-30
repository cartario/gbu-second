import React from 'react';
import {useHistory} from 'react-router-dom';

export default function ({id, title, description, cardUrl, price}) {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/detail/${id}`);
  }

  return (
    <article onClick = {()=>handleClick(id)} className="card">
      <div className="card__img">
        <img src={cardUrl} width="300" alt="cardImg" />
        <p>{title}</p>
      </div>
      <div className="card__text">
        <p className="card__description">
          {description.substr(0, 180)}...
        </p>
        <p className="card__price">{price === 'free'? "бесплатно": price}</p>
      </div>
    </article>
  );
}
