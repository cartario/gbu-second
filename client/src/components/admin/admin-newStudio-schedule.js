import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Select, FormControl, MenuItem, TextField, InputLabel} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: 'row',  
    margin: theme.spacing(1),
    width: '50%',
    [theme.breakpoints.down(415)]: {
      width: '90%',
    },
    textAlign: 'left'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dayField: {
    width: '50%'
  },
  textField: {
    flex: 1,
    marginLeft: '15px'
  },
  error: {
    margin: 0,
    padding:0,
    fontSize: '12px',
    color: 'red'
  }
}));

const DAYS = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

export default function Shedule ({name, next}){
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [time, setTime] = React.useState({
    start: "16:00",
    end: "17:00"
  });
  const  [error, setError] = React.useState(null);

  React.useEffect(()=>{
    const valid = Number(time.start.split(':')[0]) - Number(time.end.split(':')[0]) < 0;

    if(!valid){
      setError('Время окончания занятия должно быть больше начала')
    }
    else{
      setError(null)
    }
    
  },[time])

  const handleChange = (e) => {    
    setValue(e.target.value)
  }

  const handleChangeTime = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    
    setTime({...time, [name]: value})
  }
  
  React.useEffect(()=>{
    next({
      name,
      value: {
        monday: true
        
      }
    })
  }, []);

  return (
  <div>
    <p>Расписание</p>
    {/* <Select data={['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']} label={'День недели'} name={name} next={()=>console.log('f')}/> */}

    <div>
      <FormControl className={classes.formControl} variant='outlined'>
        
        <InputLabel id="demo-simple-select-label">День недели</InputLabel>
        <Select          
          className={classes.dayField}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {DAYS.map((item)=><MenuItem value={item}>{item}</MenuItem>)}
          
        </Select>
        
        <TextField
        error={error}
        id="start"
        label="Начало занятия"
        type="time"
        defaultValue={time.start}
        value={time.start}
        onChange = {handleChangeTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField  
      error={error}      
        id="end"
        label="Конец занятия"
        type="time"
        defaultValue={time.end}
        value={time.end}
        onChange = {handleChangeTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      </FormControl>
      <p className={classes.error}>{error}</p>
      </div>

  </div>)
};
