import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {ToggleVisiblePost, Select} from '../mui';
import {useSelector, useDispatch} from 'react-redux';
import {setVisible, setDisabled, setMainPostForm} from '../../redux/mainPostReducer';
import {UploadPoster} from '../../components';
import {Backdrop} from '../../components/mui'

const URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/adminPage/mainpost'

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
  const [loader, setLoader] = React.useState(false)

  const handleChange = (target) => {
    const {name, value} = target;
    setForm({...form, [name]: value});
  }

  const handleSubmit = async () => {    
    dispatch(setMainPostForm(form));

    setLoader(true)
    await fetch(`${URL}/-MXQr_to0soQv6EgpDdt.json`, {
      method: 'PATCH',
        // mode: 'no-cors',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
    })
    setLoader(false)
  }

  const handleDisabled = (value) => {
    setDisabled(value)
  }

  React.useEffect(()=>{

    const fetchPost = async () => {
      const res = await fetch(`${URL}.json`);
      const data = await res.json();

      const obj = Object.values(data)[0];
      const id = Object.keys(data)[0];  //-MXQr_to0soQv6EgpDdt

      setForm(obj);
      dispatch(setMainPostForm(obj));
    }

    fetchPost();

  },[]);

  React.useEffect(()=>{
    dispatch(setMainPostForm(form));
  }, [form])

  if(!form){
    return null;
  } 
  
  return (
    <div className={classes.root}>
      {loader && <Backdrop />}
      <Paper elevation={3}>
      <ToggleVisiblePost initial={form.visible} onChange={handleChange} name='visible'/>
      <UploadPoster initial={form.posterUrl} setDisableSubmitButton={handleDisabled} onChange={handleChange} name='posterUrl'/>
      
      <Select onChange={handleChange} name='select'/>

      <button onClick={handleSubmit} disabled={disabled}>Submit</button>
      </Paper>
    </div>)
};
