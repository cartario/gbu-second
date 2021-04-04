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
}));

export default function BasicTextFields({text, data}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(data);

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className={classes.root} noValidate autoComplete="off">      
      <TextField 
      value={value}

      onChange={handleChange}
      
      id="outlined-basic" label={text} variant="outlined" />      
    </div>
  );
}