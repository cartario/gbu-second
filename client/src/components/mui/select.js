import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {    
    margin: theme.spacing(1),
    width: '50%',
    [theme.breakpoints.down(415)]: {
      width: '90%',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({label, data, name, next}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);  
    
    next({
      name,
      value: event.target.value
    })
  }; 
  
  if(!data){
    return null;
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {data.map((item)=><MenuItem value={item}>{item}</MenuItem>)}
          
        </Select>
      </FormControl>
    </div>
  );
}