import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

const ITEMS = [{
  title: 'Схема обогащения',
  path: 'page001'
},
{
  title: 'Дробление',
  path: 'page002'
},
{
  title: 'Измельчение',
  path: 'page003'
},
{
  title: 'Флотация',
  path: 'page004'
},
{
  title: 'Реагентный режим',
  path: 'page005'
},
{
  title: 'Статистика',
  path: 'page006'
}];

const useStyles = makeStyles({  
  navItem: {
    padding: '20px',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',    
    '&:active': {
      backgroundColor: '#B868BE',         
    } ,
    '&:hover': {      
      backgroundColor: '#B868BE',
      transition: '0.5s all ease' 
    },  
  },
  navItemActive: {
    backgroundColor: '#B868BE',
    padding: '20px',
    color: '#fff',
    fontSize: '24px',    
  }
});

export const GridMenu = () => {
  const classes = useStyles();  
  const history = useHistory();
  const pathname = useHistory().location.pathname;
  const target = ITEMS.find((item)=>item.path===pathname.split('/')[1]);
  const [active, setActive] = React.useState(ITEMS.indexOf(target) || 0);
  
  const handleActive = (index) => {
    setActive(index);    
    history.push(`/${ITEMS[index].path}`);    
  }

  return <ul>
    {ITEMS.map((item, index)=><li 
    onClick={()=>handleActive(index)}
    className={index === active ? classes.navItemActive : classes.navItem}>{item.title}</li>)}    
  </ul>;
};

