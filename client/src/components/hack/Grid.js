import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {GridMenu} from './Menu';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  rightSide: {       
    width: '80%',
    marginLeft: '20%'    
  },
  rightSideTop: {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 2,
    width: '80%',    
    height: '48px',
    background: '#E36D00',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  leftSideTop: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '20%',
    height: '48px',
    backgroundColor: '#5A245E',  
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  nav: {
    position: 'fixed',
    top: '48px',
    left: 0,
    width: '20%',
    height: '100%',
    margin: 0,
    padding: '10px',
    backgroundColor: '#76167D',  
  },
  
  content: {  
    marginTop: '48px',  
    height: '600px'
  }
});

export const GridTop = ({ children }) => {
  const classes = useStyles();
  
  return (
    <>
      <div className={classes.rightSideTop}>{children}</div>
    </>
  );
};

export const GridContent = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.content}>{children}</div>;
};

export const Grid = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftSideTop}></div>

      <div className={classes.nav}>
        <GridMenu />
      </div>

      <div className={classes.rightSide}>{children}</div>
    </div>
  );
};
