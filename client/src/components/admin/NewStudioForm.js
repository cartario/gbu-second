import React from 'react';
import {Input, Button} from '../mui';
import useHttp from '../../hooks/custom.hook'
import {addStudio} from '../../redux/adminStudiosReducer'
import {useDispatch} from 'react-redux'
import {BASE_URL} from '../../constants'

const initialState = {
  group_name: null,
  studio_name: '',
  sub_studio_number: '',
};

export default function NewStudioForm ({ setToggle }) {
  const { request } = useHttp();
  const [form, setForm] = React.useState(initialState);
  
  const dispatch = useDispatch();
  
  const handleChange = (obj) => {
    const { name, value } = obj;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const resData = await request(`${BASE_URL}.json`, 'POST', form);
    const id = resData.name;
    dispatch(addStudio({ ...form, id }));
    setToggle(false);
  };

  const { studio_name, sub_studio_number } = form;

  return (
    <>
      <h3>Новая студия/секция</h3>
      <Input
        text="Название студии/секции"
        data={studio_name}
        name="studio_name"
        next={handleChange}
      />
      <Input
        text="Номер подгруппы"
        data={sub_studio_number}
        name="sub_studio_number"
        next={handleChange}
      />
      <Button disabled={false} onClick={handleSubmit} />
    </>
  );
};
