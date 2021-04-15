import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ToggleVisiblePost, Button, Toast, Input, DateTimePicker } from '../mui';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMainPostForm,
  setDate,
  setTitle,
  setAddress,
  setCategory,
  setColorContact,
  setWebsite, setPhone, setAddressContact, setSocial
} from '../../redux/mainPostReducer';
import { UploadPoster, ColorPicker } from '../../components';
import { Backdrop } from '../../components/mui';
import useHttp from '../../hooks/custom.hook';

const URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/adminPage/mainpost';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: '0 auto',
    [theme.breakpoints.down(415)]: {
      width: '100%',
    },
  },
}));

export default function MainPost() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.mainPost);
  const { disabled, date, title, address, age_category,
    colorContact,
    website, phone, addressContact, social
  } = form;
  const { request, loading } = useHttp();
  const [success, setSuccess] = React.useState(null);

  const handleChange = (obj) => {
    const { name, value } = obj;

    if (name === 'date') {
      dispatch(setDate(value));
    }
    if (name === 'title') {
      dispatch(setTitle(value));
    }
    if (name === 'address') {
      dispatch(setAddress(value));
    }
    if (name === 'category') {
      dispatch(setCategory(value));
    }
    if (name === 'colorContact') {
      dispatch(setColorContact(value));
    }
    if (name === 'website') {
      dispatch(setWebsite(value));
    }
    if (name === 'phone') {
      dispatch(setPhone(value));
    }
    if (name === 'addressContact') {
      dispatch(setAddressContact(value));
    }
    if (name === 'social') {
      dispatch(setSocial(value));
    }
  };

  const handleSubmit = async () => {
    dispatch(setMainPostForm(form));
    const res = await request(`${URL}/-MXQr_to0soQv6EgpDdt.json`, 'PATCH', form);

    if (res) {
      setSuccess(true);
    }
  };

  React.useEffect(() => {
    (async function () {
      const data = await request(`${URL}.json`);
      dispatch(setMainPostForm(Object.values(data)[0]));
    })();
  }, [dispatch, request]);

  React.useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 1000);
    }
  }, [success]);

  if(!date){
    return null;
  }

  return (
    <div className={classes.root}>
      {loading && <Backdrop />}
      <Paper elevation={3}>         
        <ColorPicker initial={colorContact} name="colorContact" next={handleChange}/>
        <ToggleVisiblePost />
        <UploadPoster />
        <h3>Основная инфа</h3>
        <DateTimePicker initial={new Date(date).toJSON().substr(0,16)} name="date" next={handleChange} />        
        <Input text="Название мероприятия" data={title} name="title" next={handleChange} />
        <Input text="Место проведения" data={address} name="address" next={handleChange} />
        <Input text="Возрастная категория" data={age_category} name="category" next={handleChange} />
        <h3>Контакты</h3>
        <Input text="Сайт" data={website} name="website" next={handleChange} />
        <Input text="Телефон" data={phone} name="phone" next={handleChange} />
        <Input text="Адрес" data={addressContact} name="addressContact" next={handleChange} />
        <Input text="Соцсеть" data={social} name="social" next={handleChange} />
        <Button disabled={disabled} onClick={handleSubmit} />
        {success && <Toast text="Успешно сохранено" />}
      </Paper>
    </div>
  );
}
