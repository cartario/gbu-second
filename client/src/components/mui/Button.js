import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons({disabled, onClick}) {
  const classes = useStyles();  

  return (
    <div>      
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={onClick}
      >
        Сохранить
      </Button>
    </div>
  );
}