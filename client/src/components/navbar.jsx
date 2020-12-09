import React from 'react';
import { Link} from 'react-router-dom';
import logo from '../img/logo.png';

const MenuItems = [{ 
  title: 'Главная', 
  link: '/' 
},
{ 
  title: 'Центр досуга', 
  link: '/about' 
},
{ 
  title: 'Афиша', 
  link: '/events' 
},
{ 
  title: 'Студии', 
  link: '/studios' 
},
{ 
  title: 'Расписание', 
  link: '/schedule' 
},
{ 
  title: 'Документы', 
  link: '/documents' 
},
{ 
  title: 'Контакты', 
  link: '/contacts' 
},
];

export default function Navbar({active, setActive}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = (index) => {
    setActive(index);    
    setOpen(false);    
  };

  return (
    <>
      <nav className={open ? 'navbar' : 'navbar navbar--closed'}>
        <div>
          <Link to="/">
            <img className="navbar__img" src={logo} alt="logoimg" />
          </Link>
        </div>
        <ul className={open ? 'navbar__list' : 'navbar__list closed'}>
          {MenuItems.map((item, index)=>
          <li key={item.title} className={`navbar__item ${active===index ? "navbar__item--active" : ""}`} onClick={()=>handleClick(index)}>
            <Link to={item.link}>{item.title}</Link>
          </li>)}          
        </ul>        
      </nav>

      <div
        onClick={() => setOpen(!open)}
        className={
          open ? 'navbar__close navbar__close--open' : 'navbar__close navbar__close--close'
        }
      ></div>
    </>
  );
}
