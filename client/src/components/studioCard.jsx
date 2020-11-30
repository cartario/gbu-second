import React from 'react';

export default function ({title, description, cardUrl, type, price}) {
  return (
    <article className="card">
      <div className="card__img">
        <img src={cardUrl} width="300" alt="cardImg" />
        <p>{title}</p>
      </div>
      <div className="card__text">
        <p className="card__description">
          {description.substr(0, 200)}...
        </p>
        <p className="card__price">{price === 'free'? "бесплатно": price}</p>
      </div>
    </article>
  );
}
