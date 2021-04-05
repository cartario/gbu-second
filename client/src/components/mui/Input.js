import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

  input: {
    width: '50%',
    [theme.breakpoints.down(415)]: {
      width: '90%',
    },
  }
}));

export default function BasicTextFields({text, data, name, next}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(data);

  const handleChange = (e) => {
    setValue(e.target.value);

    next({
      name,
      value: e.target.value
    })
  }

  React.useEffect(()=>{
    setValue(data)
  }, [data])

  return (
    <div className={classes.root} noValidate autoComplete="off">      
      <TextField 
      value={value}
      className={classes.input}
      onChange={handleChange}
      
      id="outlined-basic" label={text} variant="outlined" />      
    </div>
  );
}