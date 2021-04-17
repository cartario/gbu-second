import React from 'react';
import useHttp from '../../hooks/custom.hook';
import { Paper } from '@material-ui/core';
import { Input, Button, Table} from '../mui';
import {useSelector, useDispatch} from 'react-redux';
import {setGroupNames, setStudiosWithoutGroupName, removeStudioWithoutGroupNameById} from '../../redux/adminStudiosReducer'

const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/adminPage/studios';

const initialState = {
  group_name: null,
  studio_name: '',
  sub_studio_number: ''
}

const NewStudioForm = () => {
  const { request } = useHttp();
  const [form, setForm] = React.useState(initialState);

  const handleChange = (obj) => {
    const {name, value} = obj;

    //dispatch here
    setForm({
      ...form, [name]: value
    })
  };

  const handleSubmit = async () => {
    await request(`${BASE_URL}.json`, 'POST', form)     
  };

  const {studio_name, sub_studio_number} = form;

  return (<>
   <h3>Новая студия/секция</h3>     
    <Input text="Название студии/секции" data={studio_name} name="studio_name" next={handleChange} />
    <Input text="Номер подгруппы" data={sub_studio_number} name="sub_studio_number" next={handleChange} />
    <Button disabled={false} onClick={handleSubmit} />
  </>)
}


export default function Studios() {
  const { request } = useHttp();
  const [toggle, setToggle] = React.useState(false);
  const [data, setData] = React.useState(null);
  const {groupNames, studiosWithoutGroupName} = useSelector(({adminStudios})=>adminStudios); 
  const dispatch = useDispatch(); 

  React.useEffect(() => {
    (async () => {
      const response = await request(`${BASE_URL}/.json`);

      const fireBaseAdapter = (response) => {
        if(!response){
          return
        }
        const keys = Object.keys(response);

        return keys.map((key)=>{
          return {
            id: key,
            ...response[key]
          }
        })        
      }

      const resData = fireBaseAdapter(response)
      setData(resData);

      const uniqGroupNames = [...new Set (resData.filter((each)=>each.group_name).map((item)=>item.group_name))];      
      dispatch(setGroupNames(uniqGroupNames));
      dispatch(setStudiosWithoutGroupName(resData.filter((each)=>!each.group_name)))
    })();
  }, []);

  if(!data){
    return (
    <div className="admin-studios__wrap">
      <Paper elevation={3}>
      <p>список студий пуст</p>
      <NewStudioForm />
      </Paper>
    </div>);
  }

  

  //реализация механизма группировки
  // const studiosWithoutGroupName = data.filter((each)=>!each.group_name)
  // const groupNames = [...new Set (data.filter((each)=>each.group_name).map((item)=>item.group_name))];
  const studiosWithGroupName = groupNames.map((item)=>{    
    return data.filter((each)=>each.group_name===item)
  });
  //

  const handleClickGroup = (obj, name) => {
   obj.forEach((each)=>{
    const {id} = each; 
    dispatch(removeStudioWithoutGroupNameById(id));

    const patchData = async () => {
      await request(`${BASE_URL}/${id}.json`, 'PATCH', {group_name: name})   ;
    };

    patchData();
    
   })
  
    dispatch(setGroupNames([...groupNames, name]));
    

  }

  return (
    <div className="admin-studios__wrap">
      <Paper elevation={3}>
        {toggle ? (
          <div>           
            <p className="admin-studios__showlist" onClick={()=>setToggle(false)}>Показать список</p>
            <NewStudioForm />
          </div>
        ) : (
          <div>
            <button className="admin-section__button" onClick={()=>setToggle(true)}>+</button>

            <Table 
            handleClickGroup={handleClickGroup}
            tableName='Несгруппированные' data={studiosWithoutGroupName.map((each)=>({name:each.studio_name, id:each.id}))}/>

            {/* {studiosWithoutGroupName.map((item)=><p>{item.studio_name}</p>)} */}

            {/* {studiosWithGroupName.map((item)=>{
              return (<p>groupedName {item[0].group_name} --- {
                item.map((each)=><span>{each.id}__</span>)
                }</p>)
            })} */}
          </div>         
        )}
      </Paper>
    </div>
  );
}
