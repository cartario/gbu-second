import React from 'react';
import {useHistory} from 'react-router-dom';

export default function ({title}) {
  const history = useHistory();
  return (
    <header className="title-header">
      <h1 className="title-top"><span>{title}</span></h1>
      <a className="title-goback" href="#" onClick={()=>history.goBack()} >Назад</a>      
    </header>
  );
};

