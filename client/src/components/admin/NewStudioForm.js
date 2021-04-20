import React from 'react';
import {Input, Button, Select} from '../mui';
import {Schedule} from '../'
import useHttp from '../../hooks/custom.hook'
import {addStudio} from '../../redux/adminStudiosReducer'
import {useDispatch} from 'react-redux'
import {BASE_URL} from '../../constants'

const initialState = {
  group_name: null,
  studio_name: '',
  sub_studio_number: 1,
  address: '',
  cab: '1',
  age_min: 3,
  age_max: 10,
  price_value: '',
  price_text: '',
  picture: '',
  description: 'Самая увлекательная студия в Москве',
  schedule: {}



};

export default function NewStudioForm ({ setToggle }) {
  const { request } = useHttp();
  const [form, setForm] = React.useState(initialState);
  const [valid, setValid] = React.useState(false);
  
  const dispatch = useDispatch();

  //validation form
  React.useEffect(()=>{
    setValid(()=>form.address.length && form.studio_name.length)
  }, [form])
  
  const handleChange = (obj) => {    
    const { name, value } = obj;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if(!valid){
      console.log('not valid');
      return
    }

    const refactorForm = (form)=>{
      return {
        group_name: form.group_name,
        studio_name: form.studio_name,
        sub_studio_number: form.sub_studio_number,
        description: form.description,
        place: {
          address: form.address
        },
        
      }
    };
    const refactoredForm = refactorForm(form);   

    const resData = await request(`${BASE_URL}.json`, 'POST', refactoredForm);
    const id = resData.name;
    dispatch(addStudio({ ...refactoredForm, id }));
    setToggle(false);
  };

  const { studio_name, sub_studio_number, cab, description, schedule } = form;
  
console.log(form)
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
      
      <Select data={['Люсиновская, 53', 'Трофимова 9, корп.2']} label={'Адрес'} name={'address'} next={handleChange}/>
      <Input
        text="Кабинет"
        data={cab}
        name="cab"
        next={handleChange}
      />
      
      <Input
        text="Описание"
        data={description}
        name="description"
        next={handleChange}
      />

      <Schedule 
        data={schedule}
        next={handleChange}
        name='schedule'
      />
     
      <Button disabled={!valid} onClick={handleSubmit} />
    </>
  );
};
