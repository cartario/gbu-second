import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../img/logo.png';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  return (<>
    <nav className={open? "navbar" : "navbar navbar--closed"}>
      <div>
        <Link to="/">
          <img className="navbar__img" src={logo} alt="logoimg" />
        </Link>
      </div>
      <ul className={open? "navbar__list" : "navbar__list closed"}>
        <li className="navbar__item">
          <Link to="/">Главная</Link>
        </li>
        <li className="navbar__item">
          <Link to="/about">Центр досуга</Link>
        </li>
        <li className="navbar__item">
          <Link to="/events">Афиша</Link>
        </li>
        <li className="navbar__item">
          <Link to="/studios">Студии</Link>
        </li>
        <li className="navbar__item">
          <Link to="/schedule">Расписание</Link>
        </li>
        <li className="navbar__item">
          <Link to="/documents">Документы</Link>
        </li>
        <li className="navbar__item navbar__item--active">
          <Link to="/contacts">Контакты</Link>
        </li>
      </ul>
      {/* <div onClick = {()=>setOpen(!open)} className={open? "navbar__close navbar__close--open": "navbar__close navbar__close--close"}></div> */}
    </nav>
    
    <div onClick = {()=>setOpen(!open)} className={open? "navbar__close navbar__close--open": "navbar__close navbar__close--close"}></div>
    </>
  );
}
