import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePickers({initial = new Date().toJSON().substr(0,16), name, next}) {
  const classes = useStyles();
  const [date, setDate] = React.useState(initial);

  const handleChange = (e) => {
    setDate(e.target.value);

    next({
      name,
      value: e.target.value
    })
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Выбрать дату и время"
        type="datetime-local"
        defaultValue={initial}
        value={date}
        onChange = {handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}