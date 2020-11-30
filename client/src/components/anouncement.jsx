import React from 'react';
import posterImg from '../data/poster01.jpg';

export default function() {
  return (
    <section className="anouncement">       
      <div className="container">       
        <div className="anouncement__bg">
          <p className="anouncement__place">Онлайн</p>
          <div className="anouncement__top">
            <p className="anouncement__type">Концерт</p>
            <p className="anouncement__age">6+</p>
          </div>
          <div className="anouncement__poster">
            <img src={posterImg} alt="posterImage" />
          </div>
          <div className="anouncement__bottom">
            <p className="anouncement__date">26.11.2020</p>
            <p className="anouncement__time">17.00</p>
          </div>
        </div>
      </div>
    </section>
  );
};


