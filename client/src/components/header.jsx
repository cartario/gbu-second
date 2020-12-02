import React from 'react';
import {useHistory} from 'react-router-dom';

export default function ({title}) {
  const history = useHistory();

  const handleClick = ()=>{
    history.goBack();
  }

  return (
    <header className="title-header">
      <h1 className="title-top"><span>{title}</span></h1>
      <p className="title-goback" onClick={handleClick}><span>Назад</span></p>      
    </header>
  );
};

