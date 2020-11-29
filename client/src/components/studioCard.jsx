import React from 'react';
import cardUrl from '../data/card01.jpg';

const cards = [
  {
    name: 'Break dance',
    cardUrl,
    price: 'бесплатно',
  },
];

export default function () {
  return (
    <article className="card">
      <div className="card__img">
        <img src={cards[0].cardUrl} width="300" alt="cardImg" />
        <p>{cards[0].name}</p>
      </div>
      <div className="card__text">
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        </p>
        <p className="card__price">{cards[0].price}</p>
      </div>
    </article>
  );
}
