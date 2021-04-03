import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {ToggleVisiblePost, Select} from '../mui';
import {useSelector, useDispatch} from 'react-redux';
import {setVisible, setDisabled, setMainPostForm} from '../../redux/mainPostReducer';
import {UploadPoster} from '../../components'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: '0 auto',
    [theme.breakpoints.down(415)]: {
      width: '100%',
    },
  },

}));

const initialState = {
  visible: false,
  select: '',
  posterUrl: ''
}

export default function MainPost () {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form, setForm] = React.useState(initialState);
  const [disabled, setDisabled] = React.useState(false);

  const handleChange = (target) => {
    const {name, value} = target;
    setForm({...form, [name]: value});
  }

  const handleSubmit = () => {    
    dispatch(setMainPostForm(form));
  }

  const handleDisabled = (value) => {
    setDisabled(value)
  }
  
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
      <ToggleVisiblePost initial={form.visible} onChange={handleChange} name='visible'/>
      <UploadPoster initial={''} setDisableSubmitButton={handleDisabled} onChange={handleChange} name='posterUrl'/>
      
      <Select onChange={handleChange} name='select'/>

      <button onClick={handleSubmit} disabled={disabled}>Submit</button>
      </Paper>
    </div>)
};
