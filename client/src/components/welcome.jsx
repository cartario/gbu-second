import React from 'react';
import { useHistory } from 'react-router-dom';

const WelcomeBlock = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/studios');
  }; 

  return (    
    <section className="welcome">
      <div className="welcome__overlay overlay">
        <div className="row">
          <div className="col col-75">
            <p>Центр досуга "Даниил"</p>
            <h1>Развивайся и отдыхай вместе с нами!</h1>
            <h4>Москва - ЮАО - Даниловский район</h4>
          </div>
        </div>

        <div className="row">
          <div className="col col-50">
            <button onClick={handleClick} className="btn">
              Подобрать студии/секции
            </button>
          </div>
        </div>
      </div>        
    </section>   
  );
};

export default WelcomeBlock;
